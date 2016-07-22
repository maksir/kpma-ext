using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("DocumentStatus", Schema = "core")]
	public class DocumentStatus : ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(200)]
		public string Name { get; set; }
		public string DisplayName { get; set; }
		[Required]
		public int DocumentTypeId { get; set; }

		[MaxLength(100)]
		public string Value { get; set; }

		public int OrderNumber { get; set; }
		[MaxLength(50)]
		public string Color { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }
		[ForeignKey("DocumentTypeId")]
		public DocumentType DocumentType { get; set; }
	}
}
