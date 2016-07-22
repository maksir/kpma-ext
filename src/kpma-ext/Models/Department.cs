using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("Department", Schema = "contr")]
	public class Department : ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }

		[MaxLength(200)]
		public string Name { get; set; }

		public int ContractorId { get; set; }
		public string DisplayName { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("ContractorId")]
		public Contractor Contractor { get; set; }
	}
}
