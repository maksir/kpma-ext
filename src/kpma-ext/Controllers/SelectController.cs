using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using kpma_ext.Models;
using System.Collections.Generic;


namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
    public class SelectController : Controller
    {
		private readonly ILogger logger;
		private readonly AppDbContext db;
		private readonly UserManager<User> userManager;

		public SelectController(
			UserManager<User> userManager,
			ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			logger = loggerFactory.CreateLogger<SelectController>();
			this.userManager = userManager;
			this.db = context;
			
		}


		[HttpGet]
		[Route("{type}/{parentId:int?}/{term?}")]
		//[Authorize]
		public IActionResult List(string type, int? parentId, string term)
		{
			var EnumName = "";
			if (type.Contains("Enum-"))
			{
				EnumName = type.Replace("Enum-", "");
				type = "Enum";
			}

			var currUser = userManager.GetUserAsync(User).Result;

			var isDataManager = userManager.IsInRoleAsync(currUser, "DataManager").Result;

			var depList = db.UserDepartments.Where(d => d.UserId == currUser.Id).Select(d => d.Department);
			var restList = db.DataRestrictions.Where(r => depList.Contains(r.Department));


			IList<SelectItem> selectList = null;
			MetaObject moModel = null;

			switch (type)
			{
				case "User":
					{
						var list = db.Users.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term) || u.Email.Contains(term));
						}

						moModel = db.MetaObjects.Single(m=>m.TableName == "User");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "Role":
					{
						var list = db.Roles.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "Role");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "MetaObjectTypes":
					{
						var list = db.MetaObjects.Where(m => !m.TypeId.HasValue && m.ParentId.Value != 33); //.OrderBy(m => m.Id);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "MetaObject");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "MetaObject":
					{
						var list = db.MetaObjects.Where(m=> m.ParentId.Value != 33); //.OrderBy(m => m.Id);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "MetaObject");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "Service":
					{
						var list = db.Services.AsQueryable(); //.OrderBy(m=>m.Name);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "Service");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "Contractor":
					{
						var list = db.Contractors.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "Contractor");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "Department":
					{
						var list = db.Departments.AsQueryable().Where(d => d.ContractorId == parentId);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}

						moModel = db.MetaObjects.Single(m => m.TableName == "Department");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "DocumentType":
					{
						var list = db.DocumentTypes.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "DocumentType");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}
				case "DocumentStatus":
					{
						var list = db.DocumentStatuses.Where(d=>d.DocumentTypeId == parentId);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						moModel = db.MetaObjects.Single(m => m.TableName == "DocumentStatus");

						selectList = list.Select(u => new SelectItem { id = u.Id, text = u.DisplayName }).ToList();
						break;
					}

				default:
					break;
			}

			if (!isDataManager && moModel != null)
			{
				selectList = selectList.Where(m => restList.Where(r => r.MetaObjectId == moModel.Id).Select(r => r.ObjectId).Contains(m.id)).ToList();
			}

			if (selectList != null)
			{
				return Json(selectList);
			}

			return null;
		}


		[HttpGet]
		[Route("{type}/{id:int}")]
		//[Authorize]
		public IActionResult Get(string type, int id)
		{
			if (type.Contains("Enum-"))
			{
				type = "Enum";
			}

			switch (type)
			{
				case "User":
					if (db.Users.Any(u => u.Id == id))
					{
						return Json(db.Users.Where(u => u.Id == id).Select(u => new { id = u.Id, text = u.DisplayName }));
					}
					else
					{
						return null;
					}
				case "Role":
					if (db.Roles.Any(u => u.Id == id))
					{
						return Json(db.Roles.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				case "MetaObjectTypes":
				case "MetaObject":
				case "Enum":
					if (db.MetaObjects.Any(u => u.Id == id))
					{
						return Json(db.MetaObjects.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				case "Service":
					if (db.Services.Any())
					{
						return Json(db.Services.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				case "Contractor":
					if (db.Contractors.Any())
					{
						return Json(db.Contractors.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				case "Department":
					if (db.Departments.Any())
					{
						return Json(db.Departments.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				case "DocumentType":
					if (db.DocumentTypes.Any())
					{
						return Json(db.DocumentTypes.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				case "DocumentStatus":
					if (db.DocumentStatuses.Any())
					{
						return Json(db.DocumentStatuses.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.DisplayName }));
					}
					else
					{
						return null;
					}
				default:
					break;
			}

			return null;
		}

    }

	public class SelectItem
	{
		public int id { get; set; }
		public string text { get; set; }
	}
}
