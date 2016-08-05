using kpma_ext.Data;
using kpma_ext.Models;
using kpma_ext.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize(Roles = "Admin")]
	public class DocPropController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public DocPropController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}

		[HttpGet("list")]
		public IActionResult PropList()
		{
			try
			{
				//var CurrentUser = userManager.GetUserAsync(User).Result;

				var list = db.DocCardProperties.Select(m => new DocCardPropertyViewModel
				{
					Id = m.Id,
					DocumentGroupId = m.DocumentGroupId,
					DocumentTypeId = m.DocumentTypeId,
					CreatedBy = m.CreatedBy,
					CreatedDate = m.CreatedDate,
					LastUpdatedBy = m.LastUpdatedBy,
					LastUpdatedDate = m.LastUpdatedDate,
					DocumentGroupName = m.DocumentGroup.Name,
					DocumentTypeName = m.DocumentTypeId.HasValue ? m.DocumentType.Name : ""
				});

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Route("{id:int}")]
		public IActionResult PropGet(int id)
		{
			try
			{
				var model = db.DocCardProperties.Single(m => m.Id == id);
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
		public IActionResult PropSave([FromBody] DocCardProperty model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				if (db.DocCardProperties.Any(m => m.DocumentGroupId == model.DocumentGroupId && m.DocumentTypeId == model.DocumentTypeId))
				{
					return BadRequest("Запись с такими значениями уже существует.");
				}

				EntityEntry<DocCardProperty> ret;
				if (model.Id == 0)
				{
					ret = db.DocCardProperties.Add(model);
				}
				else
				{
					ret = db.DocCardProperties.Update(model);
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
		public IActionResult PropDelete(int id)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.DocCardProperties.FirstOrDefault(m => m.Id == id);
				if (model != null)
				{
					db.DocCardProperties.Remove(model);
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

		[HttpGet("field/list/{propId:int}")]
		public IActionResult FieldList(int propId)
		{
			try
			{
				var properties = typeof(DocCard).GetProperties().Where(p => p.GetCustomAttributes(typeof(UsePropertyAttribute), true).Count() != 0);

				IList<DocCardPropertyField> fiedls = new List<DocCardPropertyField>();

				foreach (var item in properties)
				{

					var field = db.DocCardPropertyFields.FirstOrDefault(m=>m.DocCardPropertyId == propId && m.FieldName == item.Name);
					if (field == null)
					{
						field = new DocCardPropertyField();
						field.DocCardPropertyId = propId;
						field.FieldName = item.Name;
						field.DisplayName = item.Name;
					}

					fiedls.Add(field);
				}

				return Json(fiedls);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpPost("field")]
		public IActionResult FieldSave([FromBody] IList<DocCardPropertyField> list)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				foreach (var item in list)
				{
					var has = db.DocCardPropertyFields.Any(m=>m.DocCardPropertyId == item.DocCardPropertyId && m.FieldName == item.FieldName);
					if (has)
					{
						db.DocCardPropertyFields.Update(item);
						db.SaveChanges();
					}
					else
					{
						db.DocCardPropertyFields.Add(item);
						db.SaveChanges();
					}
				}

				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

	}

	public class DocCardPropertyViewModel : DocCardProperty
	{
		public string DocumentGroupName { get; set; }
		public string DocumentTypeName { get; set; }
	}
}
