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
		private readonly AppDbContext context;

		public SelectController(
			ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			logger = loggerFactory.CreateLogger<SelectController>();
			this.context = context;
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
						var list = context.Users.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term) || u.Email.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = string.Format("{0} ({1})", u.Name, u.Email) }).ToList());
					}
				case "Role":
					{
						var list = context.Roles.AsQueryable();
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.Name }).ToList());
					}
				case "MetaObjectTypes":
					{
						var list = context.MetaObjects.Where(m => !m.TypeId.HasValue && m.ParentId.Value != 33); //.OrderBy(m => m.Id);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.Name }).ToList());
					}
				case "MetaObject":
					{
						var list = context.MetaObjects.Where(m=> m.ParentId.Value != 33); //.OrderBy(m => m.Id);
						if (!string.IsNullOrWhiteSpace(term))
						{
							list = list.Where(u => u.Name.Contains(term));
						}
						return Json(list.Select(u => new { id = u.Id, text = u.Name }).ToList());
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
					if (context.Users.Any(u => u.Id == id))
					{
						return Json(context.Users.Where(u => u.Id == id).Select(u => new { id = u.Id, text = u.Name }));
					}
					else
					{
						return null;
					}
				case "Role":
					if (context.Roles.Any(u => u.Id == id))
					{
						return Json(context.Roles.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.Name }));
					}
					else
					{
						return null;
					}
				case "MetaObjectTypes":
				case "MetaObject":
				case "Enum":
					if (context.MetaObjects.Any(u => u.Id == id))
					{
						return Json(context.MetaObjects.Where(r => r.Id == id).Select(r => new { id = r.Id, text = r.Name }));
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
