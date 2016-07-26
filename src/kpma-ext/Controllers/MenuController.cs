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

		[HttpGet("user")]
		public IActionResult UserMenu()
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var roleList = db.UserRoles.Where(m => m.UserId == db.CurrentUser.Id).Select(m => m.RoleId).ToList();
				var menuList = db.RoleMenus.Where(m => roleList.Contains(m.RoleId)).Select(m => m.MenuId).ToList();

				var topLevel = db.Menus.Where(m => !m.ParentId.HasValue).OrderBy(m => m.SortOrder).Select(m => new MenuViewModel
				{
					Id = m.Id,
					Name = m.Name,
					ParentId = m.ParentId,
					Url = m.Url,
					Command = m.Command,
					Icon = m.Icon,
					IsGroup = m.IsGroup,
					OnRight = m.OnRight,
					SortOrder = m.SortOrder
				}).ToList();

				fillChildren(topLevel, menuList);

				return Json(topLevel);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		private void fillChildren(List<MenuViewModel> parents, IList<int> menuList)
		{
			foreach (var parent in parents)
			{
				if (parent.IsGroup) {

					var children = db.Menus.Where(m => m.ParentId == parent.Id && menuList.Contains(m.Id)).OrderBy(m => m.SortOrder).Select(m => new MenuViewModel
					{
						Id = m.Id,
						Name = m.Name,
						ParentId = m.ParentId,
						Url = m.Url,
						Command = m.Command,
						Icon = m.Icon,
						IsGroup = m.IsGroup,
						OnRight = m.OnRight,
						SortOrder = m.SortOrder
					}).ToList();

					parent.Children = children;

					if (children.Any(m => m.IsGroup)) {
						fillChildren(children, menuList);
					}

				}

			}
		}
	}


	public class MenuViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int? ParentId { get; set; }
		public string Url { get; set; }
		public bool IsGroup { get; set; }
		public int SortOrder { get; set; }
		public string Icon { get; set; }
		public bool OnRight { get; set; }
		public string Command { get; set; }
		public IList<MenuViewModel> Children { get; set; }
	}


}
