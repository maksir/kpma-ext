using kpma_ext.Data;
using kpma_ext.Models;
using kpma_ext.Tools;
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

		[HttpGet]
		[Route("api/[controller]/current")]
		public async Task<IActionResult> Current()
		{
			try
			{
				var user = await userManager.GetUserAsync(User);
				if (user == null)
				{
					return BadRequest("Пользователь не авторизован");
				}
				db.CurrentUser = user;

				return Json(new UserViewModel
				{
					Id = user.Id,
					Name = user.Name,
					Email = user.Email,
					PhoneNumber = user.PhoneNumber,
					ConcurencyStamp = user.ConcurrencyStamp,
					UserName = user.UserName
				});
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

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


						return Json(new UserViewModel
						{
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
					return BadRequest(ModelState);
				}
				else
				{
					return BadRequest(ModelState);
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}

		}

		[HttpPost("api/[controller]/logout")]
		public async Task<IActionResult> LogOut()
		{
			await signInManager.SignOutAsync();
			logger.LogInformation(4, "User logged out.");
			return Ok();
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

					//db.CurrentUser = userManager.GetUserAsync(User).Result;

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

				return BadRequest(ModelState);


			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
			//return BadRequest(ModelState);
		}

		[HttpGet]
		[Authorize]
		[Route("api/[controller]/list")]
		public IActionResult List()
		{
			try
			{
				var ret = db.Users.OrderBy(m => m.Name).Select(m => new UserViewModel
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
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Authorize]
		[Route("api/[controller]/roles/{userId:int}")]
		public IActionResult Roles(int userId)
		{
			try
			{
				return Json(db.UserRoles.Where(m => m.UserId == userId).Select(m => new
				{
					userId = m.UserId,
					roleId = m.RoleId,
					roleName = db.Roles.FirstOrDefault(r => r.Id == m.RoleId).Name
				}));

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/[controller]/roles")]
		public IActionResult Roles([FromBody]UserRoleViewModel model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var entity = new IdentityUserRole<int>
				{
					UserId = model.UserId,
					RoleId = model.RoleId
				};
				db.UserRoles.Add(entity);
				db.SaveChanges();

				return StatusCode(200);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpDelete]
		[Authorize]
		[Route("api/[controller]/roles/{userId:int}/{roleId:int}")]
		public IActionResult Roles(int userId, int roleId)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

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
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
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

				return Json(new UserViewModel
				{
					Id = user.Id,
					Name = user.Name,
					UserName = user.UserName,
					Email = user.Email,
					PhoneNumber = user.PhoneNumber,
					ConcurencyStamp = user.ConcurrencyStamp,
					ContractorId = user.ContractorId
				});

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/[controller]")]
		public IActionResult Post([FromBody] UserViewModel model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

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
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
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
				var list = db.Roles.Select(m => new RoleViewModel
				{
					Id = m.Id,
					Name = m.Name,
					ConcurencyStamp = m.ConcurrencyStamp
				});

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
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

				return Json(new RoleViewModel
				{
					Id = role.Id,
					Name = role.Name,
					ConcurencyStamp = role.ConcurrencyStamp
				});
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/role")]
		public async Task<IActionResult> RolePost([FromBody]RoleViewModel model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var role = db.Roles.FirstOrDefault(m => m.Id == model.Id);

				if (role == null)
				{
					var newRole = new Role
					{
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
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		#endregion


		#region RoleMenu
		[HttpGet]
		[Authorize]
		[Route("api/role/menu/{roleId}")]
		public IActionResult RoleMenuList(int roleId)
		{
			try
			{
				var list = db.RoleMenus.Where(rm => rm.RoleId == roleId).Select(rm => new
				{
					roleId = rm.RoleId,
					menuId = rm.MenuId,
					roleName = rm.Role.Name,
					menuName = rm.Menu.Name,
					menuParentName = rm.Menu.Parent.Name
				}).ToList();

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Authorize]
		[Route("api/role/menu/items/{roleId:int}")]
		public IActionResult RoleMenuItemList(int roleId)
		{
			try
			{
				var existsMenu = db.RoleMenus.Where(rm => rm.RoleId == roleId).Select(m => m.MenuId);

				var list = db.Menus.Where(m => !m.IsGroup && !existsMenu.Contains(m.Id)).Select(m => new
				{
					id = m.Id,
					text = m.Name
				});

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		[Authorize]
		[Route("api/role/menu/{roleId:int}/{menuId:int}")]
		public IActionResult RoleMenuAdd(int roleId, int menuId)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var nrm = new RoleMenu()
				{
					RoleId = roleId,
					MenuId = menuId
				};

				db.RoleMenus.Add(nrm);
				db.SaveChanges();

				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpDelete]
		[Authorize]
		[Route("api/role/menu/{roleId:int}/{menuId:int}")]
		public IActionResult RoleMenuDelete(int roleId, int menuId)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.RoleMenus.FirstOrDefault(m => m.RoleId == roleId && m.MenuId == menuId);

				if (model != null)
				{
					db.RoleMenus.Remove(model);
					db.SaveChanges();
					return Ok();
				}

				return BadRequest("Связь не найдена.");

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		#endregion

		#region методы работы с UserDepartment

		[HttpGet("api/user/dep/{userId:int}")]
		[Authorize]
		public IActionResult UserDepList(int userId)
		{
			try
			{

				var list = db.UserDepartments.Where(m => m.UserId == userId).Select(m => new UserDepartmentViewModel
				{
					UserId = m.UserId,
					DepartmentId = m.DepartmentId,
					UserName = m.User.DisplayName,
					DepartmentName = m.Department.DisplayName,
					CreatedBy = m.CreatedBy,
					CreatedDate = m.CreatedDate,
					LastUpdatedBy = m.LastUpdatedBy,
					LastUpdatedDate = m.LastUpdatedDate
				})
				.OrderBy(o => o.DepartmentName);

				return Json(list);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost("api/user/dep/{userId:int}/{departmentId:int}")]
		[Authorize]
		public IActionResult UserDepSave(int userId, int departmentId)
		{
			try
			{
				if (db.UserDepartments.FirstOrDefault(f => f.UserId == userId && f.DepartmentId == departmentId) == null)
				{
					db.CurrentUser = userManager.GetUserAsync(User).Result;
					var model = new UserDepartment
					{
						UserId = userId,
						DepartmentId = departmentId
					};

					db.UserDepartments.Add(model);
					db.SaveChanges();
				}

				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpDelete("api/user/dep/{userId:int}/{departmentId:int}")]
		[Authorize]
		public IActionResult UserDepDelete(int userId, int departmentId)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.UserDepartments.FirstOrDefault(f => f.UserId == userId && f.DepartmentId == departmentId);
				if (model != null)
				{
					db.UserDepartments.Remove(model);
					db.SaveChanges();
				}

				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
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
		public int ContractorId { get; set; }
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

	public class UserDepartmentViewModel : UserDepartment
	{
		public string UserName { get; set; }
		public string DepartmentName { get; set; }
	}
}
