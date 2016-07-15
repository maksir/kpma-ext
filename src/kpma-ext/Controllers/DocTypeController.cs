using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using kpma_ext.Tools;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using kpma_ext.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
    [Route("api/doctype")]
	[Authorize]
    public class DocTypeController : Controller
    {

		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public DocTypeController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}

		#region методы работы с DocumentGroup

		[HttpGet]
		[Route("group/list")]
		public IActionResult GroupList() {
			try
			{
				var list = db.DocumentGroups.OrderBy(m => m.Name).ToList();
				return Json(list);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Route("group/{id:int}")]
		public IActionResult GroupGet(int id) {
			try
			{
				var model = db.DocumentGroups.FirstOrDefault(m=>m.Id == id);
				if (model != null) {
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
		[Route("group")]
		public IActionResult GroupSave([FromBody]DocumentGroup model)
		{
			try
			{
				EntityEntry<DocumentGroup> ret;
				if (model.Id == 0)
				{
					ret = db.DocumentGroups.Add(model);
				}
				else
				{
					ret = db.DocumentGroups.Update(model);
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
		[Route("group/{id:int}")]
		public IActionResult GroupDelete(int id)
		{
			try
			{
				var model = db.DocumentGroups.FirstOrDefault(m => m.Id == id);
				if (model != null)
				{
					db.DocumentGroups.Remove(model);
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


		#endregion

		#region методы работы с DocumentType

		[HttpGet]
		[Route("type/list/{groupId:int?}")]
		public IActionResult TypeList(int? groupId)
		{
			try
			{
				var list = db.DocumentTypes.AsQueryable();

				if (groupId.HasValue)
				{
					list = list.Where(m => m.DocumentGroupId == groupId.Value);
				}
				
				return Json(list.OrderBy(m => m.Name).ToList());

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Route("type/{id:int}")]
		public IActionResult TypeGet(int id)
		{
			try
			{
				var model = db.DocumentTypes.FirstOrDefault(m => m.Id == id);
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
		[Route("type")]
		public IActionResult TypeSave([FromBody]DocumentType model)
		{
			try
			{
				EntityEntry<DocumentType> ret;
				if (model.Id == 0)
				{
					ret = db.DocumentTypes.Add(model);
				}
				else
				{
					ret = db.DocumentTypes.Update(model);
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
		[Route("type/{id:int}")]
		public IActionResult TypeDelete(int id)
		{
			try
			{
				var model = db.DocumentTypes.FirstOrDefault(m => m.Id == id);
				if (model != null)
				{
					db.DocumentTypes.Remove(model);
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


		#endregion
	}
}
