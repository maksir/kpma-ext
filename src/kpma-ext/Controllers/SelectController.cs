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
			switch (type)
			{
				case "User":

					var userlist = context.Users.AsQueryable();
					if (!string.IsNullOrWhiteSpace(term))
					{
						userlist = userlist.Where(u => u.Name.Contains(term) || u.Email.Contains(term));
					}
					return Json(userlist.Select(u => new { id = u.Id, text = string.Format("{0} ({1})", u.Name, u.Email) }).ToList());

				case "Role":

					var rolelist = context.Roles.AsQueryable();
					if (!string.IsNullOrWhiteSpace(term))
					{
						rolelist = rolelist.Where(u => u.Name.Contains(term));
					}
					return Json(rolelist.Select(u => new { id = u.Id, text = u.Name }).ToList());

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
			switch (type)
			{
				case "User":
					if (context.Users.Any(u => u.Id == id))
					{
						return Json(context.Users.Where(u => u.Id == id).Select(u => new { id = u.Id, name = u.Name }));
					}
					else
					{
						return null;
					}
				case "Role":
					if (context.Roles.Any(u => u.Id == id))
					{
						return Json(context.Roles.Where(r => r.Id == id).Select(r => new { id = r.Id, name = r.Name }));
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
