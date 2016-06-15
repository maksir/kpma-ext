using kpma_ext.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	public class MetaObjectController : Controller
	{
		private readonly ILogger logger;
		private readonly AppDbContext context;

		public MetaObjectController(ILoggerFactory loggerFactory,
			AppDbContext context)
		{
			this.logger = loggerFactory.CreateLogger<MetaObjectController>(); ;
			this.context = context;
		}

		[HttpGet]
		[Authorize]
		[Route("list/{parentId:int?}")]
		public IActionResult List(int? parentId)
		{
			try
			{
				var list = context.MetaObjects.Where(m => m.ParentId == parentId).AsQueryable();

				return Json(list.Select(s => 
						new MetaObjectViewModel {
							Id = s.Id,
							Name = s.Name,
							Comment = s.Comment,
							DisplayName = s.DispalyName,
							Value = s.Value,
							ParentId = s.ParentId,
							ParentName = (s.ParentId.HasValue ? s.Parent.Name : ""),
							TypeId = s.TypeId,
							TypeName = s.Type.Name }));
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Authorize]
		[Route("{id:int}")]
		public IActionResult Get(int id)
		{
			try
			{
				var mo = context.MetaObjects.FirstOrDefault(m => m.Id == id);
				return Json(mo);
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
		public int TypeId { get; set; }
		public string TypeName { get; set; }
		public int? ParentId { get; set; }
		public string ParentName { get; set; }
		public string Comment { get; set; }
		public string Value { get; set; }
		public string DisplayName { get; set; }
	}
}
