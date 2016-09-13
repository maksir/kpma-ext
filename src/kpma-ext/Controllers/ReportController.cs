using kpma_ext.Data;
using kpma_ext.Models;
using kpma_ext.Tools;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Controllers
{
	[Route("api/[controller]")]
	public class ReportController : Controller
	{
		private readonly ILogger logger;
		private readonly AppDbContext db;
		private readonly UserManager<User> userManager;
		private JsonSerializerSettings sett;

		public ReportController(
			ILoggerFactory loggerFactory,
			AppDbContext context,
			UserManager<User> userManager)
		{
			logger = loggerFactory.CreateLogger<ReportController>();
			db = context;
			this.userManager = userManager;

			sett = new JsonSerializerSettings();
			sett.DateFormatString = "dd.MM.yyyy";
			sett.ContractResolver = new CamelCasePropertyNamesContractResolver();
		}

		[HttpGet]
		[Route("clientrequest")]
		public IActionResult ClientRequest()
		{
			try
			{
				var currentUser = userManager.GetUserAsync(User).Result;
				var dataManager = userManager.IsInRoleAsync(currentUser, "DataManager").Result;

				var request = db.ClientRequestReports.AsQueryable();
				if (!dataManager)
				{
					request = request.Where(m => m.ClientId == currentUser.ContractorId);
				}


				var list = request.OrderByDescending(o => o.ClientDate).Select(m => new ClientRequestReportViewModel
				{
					Barcode = m.Barcode,
					CargoName = m.CargoName,
					CargoReadyDate = m.CargoReadyDate,
					Client = m.Client,
					ClientDate = m.ClientDate,
					ClientId = m.ClientId,
					ClientIntId = m.ClientIntId,
					ClientName = m.Client.Name,
					ClientNumber = m.ClientNumber,
					ClientRequestId = m.ClientRequestId,
					ContrIn = m.ContrIn,
					ContrInId = m.ContrInId,
					ContrInIntId = m.ContrInIntId,
					ContrInName = m.ContrIn.Name,
					ContrOut = m.ContrOut,
					ContrOutId = m.ContrOutId,
					ContrOutIntId = m.ContrOutIntId,
					ContrOutName = m.ContrOut.Name,
					CtrExec = m.CtrExec,
					DateCustoms = m.DateCustoms,
					DateInFact = m.DateInFact,
					DateOutFact = m.DateOutFact,
					DEndFactTre = m.DEndFactTre,
					DEndFactTrs = m.DEndFactTrs,
					DSert = m.DSert,
					DStFactTre = m.DStFactTre,
					DStFactTrs = m.DStFactTrs,
					DStor = m.DStor,
					DTNumber = m.DTNumber,
					Perc = m.Perc,
					PersonBeginTO = m.PersonBeginTO,
					PersonCl = m.PersonCl,
					PersonEndTO = m.PersonEndTO,
					PersonSert = m.PersonSert,
					PersonStor = m.PersonStor,
					PersonTO = m.PersonTO,
					ProcName = m.ProcName,
					StatusBeginTO = m.StatusBeginTO,
					StatusEndTO = m.StatusEndTO,
					StatusSert = m.StatusSert,
					StatusStor = m.StatusStor,
					StatusTO = m.StatusTO,
					Supplier = m.Supplier,
					SupplierId = m.SupplierId,
					SupplierIntId = m.SupplierIntId,
					SupplierName = m.Supplier.Name,
					TTNNumber = m.TTNNumber
				});

				return Json(list, sett);

			}
			catch (Exception ex)
			{
				return BadRequest(ExceptionTools.GetExceptionMessage(ex));
			}
		}
	}

	public class ClientRequestReportViewModel : ClientRequestReport
	{
		public string ClientName { get; set; }
		public string SupplierName { get; set; }
		public string ContrOutName { get; set; }
		public string ContrInName { get; set; }

	}
}
