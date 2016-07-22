using kpma_ext.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("Contractor", Schema = "contr")]
	public class Contractor: ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(200)]
		public string Name { get; set; }

		[MaxLength(500)]
		public string FullName { get; set; }

		public string DisplayName { get; set; }

		[MaxLength(12)]
		public string INN { get; set; }
		[MaxLength(9)]
		public string KPP { get; set; }
		[MaxLength(15)]
		public string OGRN { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

	}
}
