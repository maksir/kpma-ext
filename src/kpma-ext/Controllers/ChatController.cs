using System;
using System.Linq;
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


		[HttpGet("list/{metaObjectId:int?}/{objectId:int?}/{departmentId:int?}")]
		public IActionResult List(int? metaObjectId, int? objectId, int? departmentId)
		{
			try
			{
				var CurrentUser = userManager.GetUserAsync(User).Result;

				var readed = db.ChatReads.Where(m => m.DepartmentId == departmentId).Select(m => m.ChatId);

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
					Readed = readed.Contains(c.Id),
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
				var model = db.Chats.Single(m => m.Id == id);
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

				var model = db.Chats.FirstOrDefault(m => m.Id == id);
				if (model != null)
				{
					db.Chats.Remove(model);
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

		[HttpPost("read/{metaObjectId}/{objectId}/{departmentId}")]
		public IActionResult MarkAsRead(int metaObjectId, int objectId, int departmentId)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;
				// уже прочитанные сообщения
				var readed = db.ChatReads.Where(m => m.DepartmentId == departmentId).Select(m=>m.ChatId);

				// не прочитанные
				var list = db.Chats.Where(m => m.MetaObjectId == metaObjectId && m.ObjectId == objectId && m.DepartmentId != departmentId && !readed.Contains(m.Id)).ToList();

				foreach (var item in list)
				{
					var cr = new ChatRead();
					cr.ChatId = item.Id;
					cr.DepartmentId = departmentId;

					db.ChatReads.Add(cr);
				}

				if (list.Count > 0)
				{
					db.SaveChanges();
				}

				return Ok();

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
