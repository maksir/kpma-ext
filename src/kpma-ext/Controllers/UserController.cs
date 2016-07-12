using kpma_ext.Data;
using kpma_ext.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
    public class UserController : Controller
    {
		private readonly UserManager<User> userManager;
		private readonly SignInManager<User> signInManager;
		private readonly RoleManager<Role> roleManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public UserController(
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			RoleManager<Role> roleManager,
			ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.roleManager = roleManager;
			logger = loggerFactory.CreateLogger<UserController>();
			db = context;
		}


		#region User

		[HttpPost]
		[AllowAnonymous]
		[Route("api/[controller]/login")]
		public async Task<IActionResult> Login([FromBody]UserLoginModel model, string returnUrl = null)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
					if (result.Succeeded)
					{

						var user = db.Users.FirstOrDefault(u => u.UserName == model.Email); //await userManager.GetUserAsync(User);

						return Json(new UserViewModel {
							Id = user.Id,
							Name = user.Name,
							Email = user.Email,
							PhoneNumber = user.PhoneNumber,
							ConcurencyStamp = user.ConcurrencyStamp,
							UserName = user.UserName
						});
					}
					if (result.IsLockedOut)
					{
						ModelState.AddModelError("lock", "Пользователь заблокирован.");
						logger.LogWarning(2, "User account locked out.");
					}
					else
					{
						ModelState.AddModelError("wrong", "Неправильный email или пароль.");
					}
				}
			}
			catch (Exception ex)
			{
				ModelState.AddModelError("exception", ex.Message);
			}

			return BadRequest(ModelState);
		}


		[HttpPost]
		[AllowAnonymous]
		[Route("api/[controller]/sign")]
		public async Task<IActionResult> Register([FromBody]UserSignModel model)
		{
			try
			{
				if (ModelState.IsValid)
				{
					var user = new User { UserName = model.Email, Email = model.Email, Name = model.Name };
					var result = await userManager.CreateAsync(user, model.Password);
					if (result.Succeeded)
					{
						// For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
						// Send an email with this link
						//var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
						//var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
						//await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
						//    $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
						await signInManager.SignInAsync(user, isPersistent: false);
						logger.LogInformation(3, "User created a new account with password.");

						return StatusCode(200);
					}

					AddErrors(result);

				}

			}
			catch (Exception ex)
			{
				ModelState.AddModelError("exception", ex.Message);
			}
			return BadRequest(ModelState);
		}

		[HttpGet]
		[Authorize]
		[Route("api/[controller]/list")]
		public IActionResult List()
		{
			try
			{
				var ret = db.Users.OrderBy(m => m.Name).Select(m=> new UserViewModel
				{
					Id = m.Id,
					Name = m.Name,
					Email = m.Email,
					PhoneNumber = m.PhoneNumber,
					UserName = m.UserName
				});

				return Json(ret);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Authorize]
		[Route("api/[controller]/roles/{userId:int}")]
		public IActionResult Roles(int userId)
		{
			try
			{
				return Json(db.UserRoles.Where(m => m.UserId == userId).Select(m=> new {
					userId = m.UserId,
					roleId = m.RoleId,
					roleName = db.Roles.FirstOrDefault(r=>r.Id == m.RoleId).Name
				}));

			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/[controller]/roles")]
		public IActionResult Roles([FromBody]UserRoleViewModel model)
		{
			try
			{
				var entity = new IdentityUserRole<int>{
					UserId = model.UserId,
					RoleId = model.RoleId
				};
				db.UserRoles.Add(entity);
				db.SaveChanges();

				return StatusCode(200);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpDelete]
		[Authorize]
		[Route("api/[controller]/roles/{userId:int}/{roleId:int}")]
		public IActionResult Roles(int userId, int roleId)
		{
			try
			{
				var ur = db.UserRoles.FirstOrDefault(m => m.UserId == userId && m.RoleId == roleId);
				if (ur != null)
				{
					db.UserRoles.Remove(ur);
					db.SaveChanges();
				}
				return StatusCode(200);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Authorize]
		[Route("api/[controller]/{userId:int}")]
		public IActionResult Get(int userId)
		{
			try
			{
				var user = db.Users.FirstOrDefault(m => m.Id == userId);

				if (user == null)
				{
					return BadRequest(string.Format("Пользователь не найден ({0})", userId));
				}

				return Json(new UserViewModel {
					Id = user.Id,
					Name = user.Name,
					UserName = user.UserName,
					Email = user.Email,
					PhoneNumber = user.PhoneNumber,
					ConcurencyStamp = user.ConcurrencyStamp
				});

			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/[controller]")]
		public IActionResult Post([FromBody] UserViewModel model)
		{
			try
			{
				var user = db.Users.FirstOrDefault(m => m.Id == model.Id);

				if (user == null)
				{
					return BadRequest(string.Format("Пользователь не найден ({0})", model.Id));
				}

				if (user.ConcurrencyStamp != model.ConcurencyStamp)
				{
					return BadRequest(string.Format("Запись уже изменена другим пользователем, обновите страницу (F5), чтобы увидеть изменения.", model.Id));
				}

				user.Name = model.Name;
				user.Email = model.Email;
				user.PhoneNumber = model.PhoneNumber;
				user.UserName = model.UserName;

				db.SaveChanges();

				return StatusCode(200);

			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		#endregion


		#region Role

		[HttpGet]
		[Authorize]
		[Route("api/role/list")]
		public IActionResult RoleList()
		{
			try
			{
				var list = db.Roles.Select(m=> new RoleViewModel {
					Id = m.Id,
					Name = m.Name,
					ConcurencyStamp = m.ConcurrencyStamp
				});

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Authorize]
		[Route("api/role/{roleId:int}")]
		public IActionResult Role(int roleId)
		{
			try
			{
				var role = db.Roles.FirstOrDefault(m => m.Id == roleId);

				if (role == null)
				{
					return BadRequest(string.Format("Роль не найдена ({0})", roleId));
				}

				return Json(new RoleViewModel {
					Id = role.Id,
					Name = role.Name,
					ConcurencyStamp = role.ConcurrencyStamp
				});
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/role")]
		public async Task<IActionResult> RolePost([FromBody]RoleViewModel model)
		{
			try
			{
				var role = db.Roles.FirstOrDefault(m => m.Id == model.Id);

				if (role == null)
				{
					var newRole = new Role {
						Name = model.Name,
						NormalizedName = model.Name.ToUpper()
					};

					var result = await roleManager.CreateAsync(newRole);
					if (result.Succeeded)
					{
						return StatusCode(200);
					}

					AddErrors(result);
					return BadRequest(ModelState);

				}
				else 
				{
					if (role.ConcurrencyStamp != model.ConcurencyStamp)
					{
						return BadRequest(string.Format("Запись уже изменена другим пользователем, обновите страницу (F5), чтобы увидеть изменения.", model.Id));
					}

					role.Name = model.Name;
				}
				
				db.SaveChanges();

				return StatusCode(200);

			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		#endregion


		private void AddErrors(IdentityResult result)
		{
			foreach (var error in result.Errors)
			{
				ModelState.AddModelError("common", error.Description);
			}
		}
	}



	public class UserLoginModel
	{
		public string Email { get; set; }
		public string Password { get; set; }
		public bool RememberMe { get; set; }
	}
	public class UserSignModel
	{
		[Required]
		public string Name { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[DataType(DataType.Password)]
		[Compare("Password", ErrorMessage = "Пароли не совпадают.")]
		public string ConfirmPassword { get; set; }
	}
	public class UserViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string UserName { get; set; }
		public string ConcurencyStamp { get; set; }
	}
	public class RoleViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string ConcurencyStamp { get; set; }

	}

	public class UserRoleViewModel
	{
		public int UserId { get; set; }
		public string UserName { get; set; }
		public int RoleId { get; set; }
		public string RoleName { get; set; }
	}
}
