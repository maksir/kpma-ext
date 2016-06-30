using kpma_ext.Data;
using kpma_ext.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	public class MenuController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;

		public MenuController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<SelectController>();
			this.userManager = userManager;
			this.db = context;
		}


		[HttpGet]
		[Authorize]
		[Route("list")]
		public async IActionResult List()
		{
			try
			{
				var user = await userManager.GetUserAsync(User);

				var retList = new List<MenuModel>();

				var list = db.RoleMenus.Where(r => user.Roles.Select(s=>s.RoleId).Contains(r.RoleId));



			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
    }


	public class MenuModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Url { get; set; }
		public bool IsGroup { get; set; }
		public IList<MenuModel> Children { get; set; }
	}
}
