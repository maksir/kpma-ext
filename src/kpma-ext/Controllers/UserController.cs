using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using kpma_ext.Models;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
		private readonly UserManager<User> userManager;
		private readonly SignInManager<User> signInManager;
		private readonly ILogger logger;
		private readonly AppDbContext context;

		public UserController(
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			logger = loggerFactory.CreateLogger<UserController>();
			this.context = context;
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("login")]
		public async Task<IActionResult> Login([FromBody]UserLoginModel model, string returnUrl = null)
		{
			if (ModelState.IsValid)
			{
				var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
				if (result.Succeeded)
				{
					return StatusCode(299);
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

			return BadRequest(ModelState);
		}


		[HttpPost]
		[AllowAnonymous]
		[Route("sign")]
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

		private void AddErrors(IdentityResult result)
		{
			foreach (var error in result.Errors)
			{
				ModelState.AddModelError(string.Empty, error.Description);
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
}
