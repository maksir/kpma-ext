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
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly ILogger _logger;
		private readonly AppDbContext _context;

		public UserController(
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = loggerFactory.CreateLogger<UserController>();
			_context = context;
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("login")]
		public async Task<IActionResult> Login([FromBody]UserLoginModel model, string returnUrl = null)
		{
			if (ModelState.IsValid)
			{
				var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
				if (result.Succeeded)
				{
					return StatusCode(299);
				}
				if (result.IsLockedOut)
				{
					ModelState.AddModelError("lock", "Пользователь заблокирован.");
					_logger.LogWarning(2, "User account locked out.");
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
			if (ModelState.IsValid)
			{
				var user = new User { UserName = model.Email, Email = model.Email };
				var result = await _userManager.CreateAsync(user, model.Password);
				if (result.Succeeded)
				{
					// For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
					// Send an email with this link
					//var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
					//var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
					//await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
					//    $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
					await _signInManager.SignInAsync(user, isPersistent: false);
					_logger.LogInformation(3, "User created a new account with password.");

					return StatusCode(200);
				}

				AddErrors(result);

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
