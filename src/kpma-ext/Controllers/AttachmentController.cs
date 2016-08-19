using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using kpma_ext.Models;
using kpma_ext.Data;
using Microsoft.AspNetCore.Http;
using kpma_ext.Tools;
using System.IO;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class AttachmentController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public AttachmentController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
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
				var list = db.Attachments
									.Where(a => a.MetaObjectId == metaObjectId && a.ObjectId == objectId)
									.OrderBy(a => a.Name)
									.Select(a => new
									{
										id = a.Id,
										name = a.Name,
										fileName = a.FileName,
										metaObjectId = a.MetaObjectId,
										objectId = a.ObjectId,
										createdBy = a.CreatedBy,
										createdDate = a.CreatedDate,
										lastUpdatedBy = a.LastUpdatedBy,
										lastUpdatedDate = a.LastUpdatedDate
									}).ToList();

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			try
			{
				var model = db.Attachments.Where(a => a.Id == id).Select(a => new AttachmentDataModel
				{
					Id = a.Id,
					Name = a.Name,
					MetaObjectId = a.MetaObjectId,
					ObjectId = a.ObjectId
				}).FirstOrDefault();

				return Json(model);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpPost]
		public IActionResult Save([FromForm] AttachmentDataModel model)
		{
			try
			{

				if (model == null)
				{
					return BadRequest("Ошибка преобразования модели. Обратитесь в поддержку.");
				}

				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var attModel = new Attachment
				{
					Name = model.Name,
					MetaObjectId = model.MetaObjectId,
					ObjectId = model.ObjectId,
				};

				if (model.File != null)
				{
					attModel.FileName = model.File.FileName;
					attModel.ContentType = model.File.ContentType;
					attModel.Length = model.File.Length;

					var stream = model.File.OpenReadStream();
					using (MemoryStream ms = new MemoryStream())
					{
						stream.CopyTo(ms);
						attModel.File = ms.ToArray();
					}
				}


				if (model.Id != 0)
				{
					attModel.Id = model.Id;
					// обновили только описание, его только и поменяем
					if (model.File == null)
					{
						attModel = db.Attachments.Single(a => a.Id == model.Id);
						attModel.Name = model.Name;
					}

					db.Attachments.Update(attModel);
				}
				else
				{
					db.Attachments.Add(attModel);
				}

				db.SaveChanges();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.Attachments.FirstOrDefault(m => m.Id == id);

				if (model.CreatedBy.ToLower() != db.CurrentUser.UserName.ToLower())
				{
					return BadRequest("Вложение может удалять только автор!");
				}

				if (model != null)
				{
					db.Attachments.Remove(model);
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

		[HttpGet("download/{id:int}/{*filename}")]
		public IActionResult Download(int id) {

			try
			{
				var model = db.Attachments.Single(a=>a.Id == id);

				return File(model.File, model.ContentType, model.FileName);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}
	}

	public class AttachmentDataModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int MetaObjectId { get; set; }
		public int ObjectId { get; set; }
		public IFormFile File { get; set; }
	}
}
