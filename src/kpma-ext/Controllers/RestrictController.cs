using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using kpma_ext.Tools;
using kpma_ext.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize(Roles = "Admin, Programmer, DataManager")]
	public class RestrictController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public RestrictController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}

		[HttpGet("list/{contrId:int?}/{depId:int?}/{moId:int?}")]
		public IActionResult GetList(int? contrId, int? depId, int? moId)
		{
			try
			{

				var list = db.DataRestrictions
								.Include(m => m.MetaObject)
								.Include(m => m.Department).ThenInclude(d => d.Contractor)
								.AsQueryable();

				if (contrId.HasValue)
				{
					list = list.Where(m => m.Department.ContractorId == contrId.Value);
				}
				if (depId.HasValue)
				{
					list = list.Where(m => m.DepartmentId == depId.Value);
				}
				if (moId.HasValue)
				{
					list = list.Where(m => m.MetaObjectId == moId.Value);
				}


				var retList = list.ToList().Select(m => new DataRestrictionViewModel
				{
					DepartmentId = m.DepartmentId,
					MetaObjectId = m.MetaObjectId,
					ObjectId = m.ObjectId,
					DepartmentName = m.Department.DisplayName,
					ContractorId = m.Department.ContractorId,
					ContractorName = m.Department.Contractor.DisplayName,
					MetaObjectName = m.MetaObject.DisplayName,
					ObjectName = GetObjectName(m.MetaObject.TableName, m.ObjectId)
				});

				return Json(retList);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpPost]
		public IActionResult Save([FromBody] DataRestriction model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				if (db.DataRestrictions.Any(m => m.DepartmentId == model.DepartmentId && m.MetaObjectId == model.MetaObjectId && m.ObjectId == model.ObjectId))
				{
					return BadRequest(new ErrorMessage { Show = true, Text = "Запись с такими значениями уже существует." });
				}

				var ret = db.DataRestrictions.Add(model);

				db.SaveChanges();

				return Json(ret.Entity);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpDelete("{depId:int}/{moId:int}/{objectId:int}")]
		public IActionResult Delete(int depId, int moId, int objectId)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.DataRestrictions.FirstOrDefault(m => m.DepartmentId == depId && m.MetaObjectId == moId && m.ObjectId == objectId);
				if (model != null)
				{
					db.DataRestrictions.Remove(model);
					db.SaveChanges();
					return Ok();
				}
				else
				{
					return BadRequest(new ErrorMessage { Show = true, Text = "Запись не найдена." });
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		private string GetObjectName(string tableName, int objectId)
		{
			string name = string.Empty;

			switch (tableName)
			{
				case "Contractor":
					{
						var obj = db.Contractors.FirstOrDefault(m => m.Id == objectId);
						if (obj != null)
						{
							name = obj.DisplayName;
						}
					}
					break;

				case "Department":
					{
						var obj = db.Departments.FirstOrDefault(m => m.Id == objectId);
						if (obj != null)
						{
							name = obj.DisplayName;
						}
					}
					break;
				default:
					break;
			}

			return name;
		}
	}


	public class DataRestrictionViewModel : DataRestriction
	{
		public int ContractorId { get; set; }
		public string ContractorName { get; set; }
		public string DepartmentName { get; set; }
		public string MetaObjectName { get; set; }
		public string ObjectName { get; set; }
	}
}
