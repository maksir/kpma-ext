using kpma_ext.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("DocumentType", Schema = "core")]
	public class DocumentType: ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(200)]
		public string Name { get; set; }

		public string DisplayName { get; set; }

		public int DocumentGroupId { get; set; }

		[ForeignKey("DocumentGroupId")]
		public DocumentGroup DocumentGroup { get; set; }
		[MaxLength(100)]
		public string BarcodeTemplate { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

	}
}
