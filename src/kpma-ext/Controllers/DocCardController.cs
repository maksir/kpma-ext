using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using kpma_ext.Models;
using Microsoft.AspNetCore.Authorization;
using kpma_ext.Tools;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using kpma_ext.Data;
using Microsoft.EntityFrameworkCore.ChangeTracking;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class DocCardController : Controller
	{
		private readonly UserManager<User> userManager;
		private readonly ILogger logger;
		private readonly AppDbContext db;


		public DocCardController(ILoggerFactory lf, AppDbContext context, UserManager<User> userManager)
		{
			logger = lf.CreateLogger<MenuController>();
			this.userManager = userManager;
			this.db = context;
		}


		[HttpGet("list")]
		public IActionResult List()
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var list = db.DocCards.Where(d => d.AuthorId == db.CurrentUser.Id).Select(d => new DocCardViewModel
				{
					Id = d.Id,
					AuthorId = d.AuthorId,
					AuthorName = d.Author.DisplayName,
					Barcode = d.Barcode,
					Content1 = d.Content1,
					Content2 = d.Content2,
					Content3 = d.Content3,
					Content4 = d.Content4,
					Content5 = d.Content5,
					ContractorFromId = d.ContractorFromId,
					ContractorFromName = d.ContractorFrom.DisplayName,
					ContractorToId = d.ContractorToId,
					ContractorToName = d.ContractorTo.DisplayName,
					CreatedBy = d.CreatedBy,
					CreatedDate = d.CreatedDate,
					DisplayName = d.DisplayName,
					DocDate = d.DocDate,
					DocNumber = d.DocNumber,
					DocumentStatusId = d.DocumentStatusId,
					DocumentStatusName = d.DocumentStatus.DisplayName,
					DocumentTypeId = d.DocumentTypeId,
					DocumentTypeName = d.DocumentType.DisplayName,
					LastUpdatedBy = d.LastUpdatedBy,
					LastUpdatedDate = d.LastUpdatedDate,
					DepartmentFromId = d.DepartmentFromId,
					DepartmentFromName = d.DepartmentFrom.DisplayName,
					DepartmentToId = d.DepartmentToId,
					DepartmentToName = d.DepartmentTo.DisplayName

				}).ToList();

				return Json(list);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}

		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			try
			{
				DocCard model;

				if (id == 0)
				{
					var CurrentUser = userManager.GetUserAsync(User).Result;

					model = new DocCard();
					model.AuthorId = CurrentUser.Id;
					model.DocDate = DateTime.Now;
					model.ContractorFromId = CurrentUser.ContractorId;

					var depList = db.UserDepartments.Where(m=>m.UserId == CurrentUser.Id).ToList();
					if (depList.Count == 1)
					{
						model.DepartmentFromId = depList[0].DepartmentId;
					}

				}
				else
				{
					model = db.DocCards.Single(d => d.Id == id);
				}
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
		public IActionResult Save([FromBody] DocCard model)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				EntityEntry<DocCard> ret;
				if (model.Id == 0)
				{
					model.AuthorId = db.CurrentUser.Id;
					ret = db.DocCards.Add(model);
				}
				else
				{
					ret = db.DocCards.Update(model);
				}
				db.SaveChanges();
				return Json(ret.Entity);
			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			try
			{
				db.CurrentUser = userManager.GetUserAsync(User).Result;

				var model = db.DocCards.Single(m => m.Id == id);
				if (model != null)
				{
					db.DocCards.Remove(model);
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


	
		[HttpGet("group/{folderId:int}")]
		public IActionResult GroupList(int folderId)
		{
			try
			{
				var currentUser = userManager.GetUserAsync(User).Result;

				var depList = db.UserDepartments.Where(m => m.UserId == currentUser.Id).Select(m => m.DepartmentId);

				IQueryable<DocGroupFolder> list = null;

				DocCardFolder folder = (DocCardFolder)folderId;

				switch (folder)
				{
					case DocCardFolder.In:
						var allDocs = db.DocCards
											.Where(d => depList.Contains(d.DepartmentToId))
											.Select(m => new { docGroup = m.DocumentType.DocumentGroup, isNew = (m.DocumentStatus.Value == "1" ? 1 : 0) });
											

						list = allDocs.GroupBy(m => m.docGroup)
										.Select(g => new DocGroupFolder { id = g.Key.Id, name = g.Key.DisplayName, badge = g.Sum(s => s.isNew) })
										.OrderBy(d => d.name);

						break;
					case DocCardFolder.Out:
						list = db.DocCards
									.Where(d => depList.Contains(d.DepartmentFromId))
									.Select(d => d.DocumentType.DocumentGroup)
									.Distinct()
									.Select(d => new DocGroupFolder { id = d.Id, name = d.DisplayName, badge = 0 })
									.OrderBy(d => d.name);
						break;
					default:
						break;
				}

				return Json(list);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}


		[HttpGet("list/{folderId:int}/{groupId:int?}")]
		public IActionResult DocList(int folderId, int? groupId)
		{
			try
			{
				var currentUser = userManager.GetUserAsync(User).Result;
				var depList = db.UserDepartments.Where(m => m.UserId == currentUser.Id).Select(m => m.DepartmentId);

				IQueryable<DocCard> list = null;

				DocCardFolder folder = (DocCardFolder)folderId;

				switch (folder)
				{
					case DocCardFolder.In:
						list = db.DocCards.Where(d => depList.Contains(d.DepartmentToId)).OrderByDescending(d => d.DisplayName);
						break;
					case DocCardFolder.Out:
						list = db.DocCards.Where(d => depList.Contains(d.DepartmentFromId)).OrderByDescending(d => d.DisplayName);
						break;
					default:
						break;
				}

				if (list == null)
				{
					return BadRequest("Ошибка определения списка документов");
				}

				if (groupId.HasValue)
				{
					list = list.Where(m=>m.DocumentType.DocumentGroupId == groupId.Value);
				}

				var ret = list.Select(d => new DocCardViewModel
				{
					Id = d.Id,
					AuthorId = d.AuthorId,
					AuthorName = d.Author.DisplayName,
					Barcode = d.Barcode,
					Content1 = d.Content1,
					Content2 = d.Content2,
					Content3 = d.Content3,
					Content4 = d.Content4,
					Content5 = d.Content5,
					ContractorFromId = d.ContractorFromId,
					ContractorFromName = d.ContractorFrom.DisplayName,
					ContractorToId = d.ContractorToId,
					ContractorToName = d.ContractorTo.DisplayName,
					CreatedBy = d.CreatedBy,
					CreatedDate = d.CreatedDate,
					DisplayName = d.DisplayName,
					DocDate = d.DocDate,
					DocNumber = d.DocNumber,
					DocumentStatusId = d.DocumentStatusId,
					DocumentStatusName = d.DocumentStatus.DisplayName,
					DocumentTypeId = d.DocumentTypeId,
					DocumentTypeName = d.DocumentType.DisplayName,
					LastUpdatedBy = d.LastUpdatedBy,
					LastUpdatedDate = d.LastUpdatedDate,
					DepartmentFromId = d.DepartmentFromId,
					DepartmentFromName = d.DepartmentFrom.DisplayName,
					DepartmentToId = d.DepartmentToId,
					DepartmentToName = d.DepartmentTo.DisplayName

				}).ToList();

				return Json(ret);


			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}
	}

	public class DocCardViewModel
	{
		public int Id { get; set; }
		public int DocNumber { get; set; }
		public DateTime DocDate { get; set; }
		public string Barcode { get; set; }

		public string DisplayName { get; set; }

		public int DocumentTypeId { get; set; }
		public string DocumentTypeName { get; set; }
		public int DocumentStatusId { get; set; }
		public string DocumentStatusName { get; set; }

		public int ContractorFromId { get; set; }
		public string ContractorFromName { get; set; }
		public int ContractorToId { get; set; }
		public string ContractorToName { get; set; }

		public int DepartmentFromId { get; set; }
		public string DepartmentFromName { get; set; }
		public int DepartmentToId { get; set; }
		public string DepartmentToName { get; set; }

		public int AuthorId { get; set; }
		public string AuthorName { get; set; }

		public string Content1 { get; set; }
		public string Content2 { get; set; }
		public string Content3 { get; set; }
		public string Content4 { get; set; }
		public string Content5 { get; set; }

		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

	}

	public enum DocCardFolder
	{
		In = 1,
		Out = 2
	}

	public class DocGroupFolder
	{
		public int id { get; set; }
		public string name { get; set; }
		public int badge { get; set; }
	}
}
