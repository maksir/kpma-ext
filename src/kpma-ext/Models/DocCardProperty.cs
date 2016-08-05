using kpma_ext.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("DocCardProperty", Schema = "doc")]
	public class DocCardProperty : ILogModel
	{
		[Key]
		public int Id { get; set; }
		public int DocumentGroupId { get; set; }
		public int? DocumentTypeId { get; set; }


		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }


		[ForeignKey("DocumentGroupId")]
		public DocumentGroup DocumentGroup { get; set; }
		[ForeignKey("DocumentTypeId")]
		public DocumentType DocumentType { get; set; }


	}
}
