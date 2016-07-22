using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using Microsoft.AspNetCore.Authorization;
using kpma_ext.Models;
using kpma_ext.Tools;
using Microsoft.EntityFrameworkCore.ChangeTracking;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class ChatController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public ChatController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}


		[HttpGet("list/{metaObjectId:int}/{objectId:int}")]
		public IActionResult List(int metaObjectId, int objectId)
		{
			try
			{
				var CurrentUser = userManager.GetUserAsync(User).Result;

				var depList = db.UserDepartments.Where(d => d.UserId == CurrentUser.Id).Select(d => d.DepartmentId);

				var list = db.Chats.Where(m => m.MetaObjectId == metaObjectId && m.ObjectId == objectId).OrderBy(m => m.CreatedDate).Select(c => new ChatViewModel
				{
					Id = c.Id,
					AuthorId = c.AuthorId,
					DepartmentId = c.DepartmentId,
					DepartmentName = c.Department.Name,
					MetaObjectId = c.MetaObjectId,
					ObjectId = c.ObjectId,
					MessageText = c.MessageText,
					CreatedBy = c.CreatedBy,
					CreatedDate = c.CreatedDate,
					LastUpdatedBy = c.LastUpdatedBy,
					LastUpdatedDate = c.LastUpdatedDate,
					Readed = false,
					IsOut = depList.Contains(c.DepartmentId)
					
				}).ToList();

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
		public IActionResult Save([FromBody] Chat model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				EntityEntry<Chat> ret;
				if (model.Id == 0)
				{
					model.AuthorId = db.CurrentUser.Id;

					ret = db.Chats.Add(model);
				}
				else
				{
					ret = db.Chats.Update(model);
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


	public class ChatViewModel : Chat
	{
		public bool Readed { get; set; }
		public bool IsOut { get; set; }
		public string DepartmentName { get; set; }
	}
}
