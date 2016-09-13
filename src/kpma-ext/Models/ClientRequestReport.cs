using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	public class ClientRequestReport
    {
		//[Key]
		public int ClientRequestId { get; set; }
		[MaxLength(200)]
		public string Barcode { get; set; }
		
		public DateTime? ClientDate { get; set; }
		[MaxLength(200)]
		public string ClientNumber { get; set; }
		[MaxLength(500)]
		public string PersonCl { get; set; }
		public int? ClientId { get; set; }
		public int? SupplierId { get; set; }
		public int? ContrOutId { get; set; }
		public int? ContrInId { get; set; }
		public int? ClientIntId { get; set; }
		public int? SupplierIntId { get; set; }
		public int? ContrOutIntId { get; set; }
		public int? ContrInIntId { get; set; }
		[MaxLength(500)]
		public string CargoName { get; set; }
		public decimal Perc { get; set; }
		[MaxLength(200)]
		public string StatusBeginTO { get; set; }
		[MaxLength(500)]
		public string PersonBeginTO { get; set; }
		public DateTime? CargoReadyDate { get; set; }
		public DateTime? DStFactTrs { get; set; }
		[MaxLength(200)]
		public string TTNNumber { get; set; }
		public DateTime? DEndFactTrs { get; set; }
		public DateTime? DateInFact { get; set; }
		[MaxLength(250)]
		public string CtrExec { get; set; }
		[MaxLength(200)]
		public string ProcName { get; set; }
		[MaxLength(200)]
		public string StatusTO { get; set; }
		[MaxLength(500)]
		public string PersonTO { get; set; }
		public DateTime? DateCustoms { get; set; }
		public DateTime? DateOutFact { get; set; }
		[MaxLength(200)]
		public string StatusEndTO { get; set; }
		[MaxLength(500)]
		public string PersonEndTO { get; set; }
		public DateTime? DStFactTre { get; set; }
		public DateTime? DEndFactTre { get; set; }
		[MaxLength(500)]
		public string DTNumber { get; set; }

		[MaxLength(200)]
		public string StatusSert { get; set; }
		[MaxLength(500)]
		public string PersonSert { get; set; }
		public DateTime? DSert { get; set; }

		[MaxLength(200)]
		public string StatusStor { get; set; }
		[MaxLength(500)]
		public string PersonStor { get; set; }
		
		public DateTime? DStor { get; set; }

		/// <summary>
		/// Поставщик
		/// </summary>
		[ForeignKey("SupplierIntId")]
		[JsonIgnore]
		public Contractor Supplier { get; set; }
		/// <summary>
		/// Клиент
		/// </summary>
		[ForeignKey("ClientIntId")]
		public Contractor Client { get; set; }
		/// <summary>
		/// грузоотправитель
		/// </summary>
		[ForeignKey("ContrOutIntId")]
		public Contractor ContrOut { get; set; }
		/// <summary>
		/// грузополучатель
		/// </summary>
		[ForeignKey("ContrInIntId")]
		public Contractor ContrIn { get; set; }

	}
}
