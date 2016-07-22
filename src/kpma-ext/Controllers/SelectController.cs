using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
    public class SelectController : Controller
    {
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public SelectController(
			ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			logger = loggerFactory.CreateLogger<SelectController>();
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

			switch (type)
			{
				case "User":
					{
						var list = db.Users.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term) || u.Email.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList()); //string.Format("{0} ({1})", u.Name, u.Email)
					}
				case "Role":
					{
						var list = db.Roles.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "MetaObjectTypes":
					{
						var list = db.MetaObjects.Where(m => !m.TypeId.HasValue && m.ParentId.Value != 33); //.OrderBy(m => m.Id);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "MetaObject":
					{
						var list = db.MetaObjects.Where(m=> m.ParentId.Value != 33); //.OrderBy(m => m.Id);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "Service":
					{
						var list = db.Services.AsQueryable(); //.OrderBy(m=>m.Name);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "Contractor":
					{
						var list = db.Contractors.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "Department":
					{
						var list = db.Departments.AsQueryable().Where(d => d.ContractorId == parentId);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "DocumentType":
					{
						var list = db.DocumentTypes.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}
				case "DocumentStatus":
					{
						var list = db.DocumentStatuses.Where(d=>d.DocumentTypeId == parentId);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.DisplayName }).ToList());
					}

				default:
					break;
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
}
