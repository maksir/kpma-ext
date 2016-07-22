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
using kpma_ext.Tools;
using Microsoft.EntityFrameworkCore.ChangeTracking;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{

	[Authorize]
	public class ContractorController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public ContractorController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}

		#region методы работы с Contractor



		[HttpGet]
		[Route("api/contractor/list")]
		public IActionResult List()
		{
			try
			{
				var list = db.Contractors.OrderBy(c => c.Name).ToList();
				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Route("api/contractor/{id:int}")]
		public IActionResult Get(int id)
		{
			try
			{
				var model = db.Contractors.SingleOrDefault(d => d.Id == id);

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
		[Route("api/contractor")]
		public IActionResult Save([FromBody] Contractor model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				EntityEntry<Contractor> ret;
				if (model.Id == 0)
				{
					ret = db.Contractors.Add(model);
				}
				else
				{
					ret = db.Contractors.Update(model);
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
		[Route("api/contractor/{id:int}")]
		public IActionResult Delete(int id)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.Contractors.Single(m => m.Id == id);
				if (model != null)
				{
					db.Contractors.Remove(model);
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


		#region методы работы с Department


		[HttpGet]
		[Route("api/department/list/{contrId:int}")]
		public IActionResult DepartmentList(int contrId)
		{
			try
			{
				var list = db.Departments.Where(d => d.ContractorId == contrId).OrderBy(c => c.Name).ToList();
				return Json(list);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet]
		[Route("api/department/{id:int}")]
		public IActionResult DepartmentGet(int id)
		{
			try
			{
				var model = db.Departments.SingleOrDefault(d => d.Id == id);

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
		[Route("api/department")]
		public IActionResult DepartmentSave([FromBody] Department model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				EntityEntry<Department> ret;
				if (model.Id == 0)
				{
					ret = db.Departments.Add(model);
				}
				else
				{
					ret = db.Departments.Update(model);
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
		[Route("api/department/{id:int}")]
		public IActionResult DepartmentDelete(int id)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.Departments.Single(m => m.Id == id);
				if (model != null)
				{
					db.Departments.Remove(model);
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
