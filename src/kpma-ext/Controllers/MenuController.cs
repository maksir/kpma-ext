using kpma_ext.Data;
using kpma_ext.Models;
using kpma_ext.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	public class MenuController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public MenuController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}


		[HttpGet]
		[Route("list/{parentId:int?}")]
		public IActionResult List(int? parentId)
		{
			try
			{
				var list = db.Menus.Where(m => m.ParentId == parentId).OrderBy(m => m.SortOrder).ToList();

				return Json(list);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		[Route("save")]
		public IActionResult Save([FromBody]Menu model)
		{
			try
			{
				if (ModelState.IsValid)
				{
					db.CurrentUser = userManager.GetUserAsync(User).Result;

					if (model.Id == 0)
					{
						var newModel = db.Menus.Add(model);
						db.SaveChanges();
						return Json(newModel.Entity);
					}
					else
					{

						var state = db.Menus.Update(model);
						db.SaveChanges();
						return Json(state.Entity);
					}
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
	}


}
