using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using kpma_ext.Models;
using kpma_ext.Tools;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
    [Route("api/[controller]")]
	[Authorize]
    public class ServiceController : Controller
    {
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public ServiceController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}


		[HttpGet]
		[Route("list")]
		public IActionResult List() {
			try
			{
				var list = db.Services.OrderBy(m => m.Name).ToList();
				return Json(list);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Route("{id:int}")]
		public IActionResult Get(int id)
		{
			try
			{
				var model = db.Services.Single(m => m.Id == id);
				if (model != null)
				{
					return Json(model);
				}
				return BadRequest($"Запись не найдена! ({id})");
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		public IActionResult Save([FromBody] Service model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				EntityEntry<Service> ret;
				if (model.Id == 0)
				{
					ret = db.Services.Add(model);
				}
				else
				{
					ret = db.Services.Update(model);
				}
				db.SaveChanges();
				return Json(ret.Entity);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpDelete]
		[Route("{id:int}")]
		public IActionResult Delete(int id)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.Services.FirstOrDefault(m => m.Id == id);
				if (model != null)
				{
					db.Services.Remove(model);
					db.SaveChanges();
					return Ok();
				}
				else
				{
					return BadRequest($"Запись не найдена! ({id})");
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}
	}
}
