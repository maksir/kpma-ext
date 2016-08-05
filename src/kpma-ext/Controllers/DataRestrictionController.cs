using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Models;
using kpma_ext.Data;
using kpma_ext.Tools;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize(Roles ="Admin, Programmer, DataManager")]
	public class DataRestrictionController : Controller
    {
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public DataRestrictionController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}

		[HttpGet("{departmentId}/{metObjectId}")]
		public IActionResult List(int departmentId, int metaObjectId)
		{
			try
			{
				var list = db.DataRestrictions.Where(r=>r.DepartmentId == departmentId && r.MetaObjectId == metaObjectId);

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet("{departmentId}/{metObjectId}")]
		public IActionResult Get(int departmentId, int metaObjectId)
		{
			try
			{
				var list = db.DataRestrictions.Where(r => r.DepartmentId == departmentId && r.MetaObjectId == metaObjectId).FirstOrDefault();

				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpPost("{departmentId}/{metObjectId}/{objectId}")]
		public IActionResult Save(int departmentId, int metaObjectId, int objectId)
		{
			try
			{
				var model = db.DataRestrictions.FirstOrDefault(m=>m.DepartmentId ==departmentId && m.MetaObjectId == metaObjectId && m.ObjectId == objectId);

				if (model != null)
				{
					return Ok();
				}

				model = new DataRestriction();
				model.MetaObjectId = metaObjectId;
				model.ObjectId = objectId;
				model.DepartmentId = departmentId;

				db.DataRestrictions.Add(model);
				db.SaveChanges();

				return Ok();

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpDelete("{departmentId}/{metObjectId}/{objectId}")]
		public IActionResult Delete(int departmentId, int metaObjectId, int objectId)
		{
			try
			{
				var model = db.DataRestrictions.FirstOrDefault(m => m.DepartmentId == departmentId && m.MetaObjectId == metaObjectId && m.ObjectId == objectId);
				if (model == null)
				{
					db.DataRestrictions.Remove(model);
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
}
