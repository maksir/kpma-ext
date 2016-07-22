using kpma_ext.Data;
using kpma_ext.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize(Roles = "Programmer, Admin")]
	public class MetaObjectController : Controller
	{
		private readonly ILogger logger;
		private readonly AppDbContext db;
		private readonly UserManager<User> userManager;

		public MetaObjectController(
			ILoggerFactory loggerFactory,
			AppDbContext context, 
			UserManager<User> userManager)
		{
			logger = loggerFactory.CreateLogger<MetaObjectController>();
			db = context;
			this.userManager = userManager;
		}

		[HttpGet]
		[Route("list/{parentId:int?}")]
		public IActionResult List(int? parentId)
		{
			try
			{
				var list = db.MetaObjects.Where(m => m.ParentId == parentId).AsQueryable();

				return Json(list.Select(s =>
						new MetaObjectViewModel
						{
							Id = s.Id,
							Name = s.Name,
							Comment = s.Comment,
							DisplayName = s.DisplayName,
							Value = s.Value,
							ParentId = s.ParentId,
							ParentName = (s.ParentId.HasValue ? s.Parent.Name : ""),
							TypeId = s.TypeId,
							TypeName = s.Type.Name,
							CreatedBy = s.CreatedBy,
							CreatedDate = s.CreatedDate,
							LastUpdatedBy = s.LastUpdatedBy,
							LastUpdatedDate = s.LastUpdatedDate
						}));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("{id:int}")]
		public IActionResult Get(int id)
		{
			try
			{
				var mo = db.MetaObjects.FirstOrDefault(m => m.Id == id);
				return Json(mo);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("save")]
		public IActionResult Save([FromBody]MetaObject model)
		{
			try
			{
				if (model == null)
				{
					return BadRequest("Ошибка парсинга модели.");
				}

				db.CurrentUser = userManager.GetUserAsync(User).Result;

				if (model.Id == 0)
				{
					var newModel = db.MetaObjects.Add(model);
					db.SaveChanges();
					return Json(newModel.Entity);
				}
				else
				{
					
					var state = db.MetaObjects.Update(model);
					db.SaveChanges();
					return Json(state.Entity);
				}
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}


	public class MetaObjectViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int? TypeId { get; set; }
		public string TypeName { get; set; }
		public int? ParentId { get; set; }
		public string ParentName { get; set; }
		public string Comment { get; set; }
		public string Value { get; set; }
		public string DisplayName { get; set; }
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

	}
}
