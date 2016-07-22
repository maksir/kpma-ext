using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("Attachment", Schema ="core")]
    public class Attachment : ILogModel
    {
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(200)]
		public string Name { get; set; }
		[Required]
		public int MetaObjectId { get; set; }
		[Required]
		public int ObjectId { get; set; }
		[Required]
		[MaxLength(500)]
		public string ContentType { get; set; }
		[Required]
		[MaxLength(500)]
		public string FileName { get; set; }
		[Required]
		public long Length { get; set; }
		[Required]
		public byte[] File { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("MetaObjectId")]
		public MetaObject MetaObject { get; set; }
	}
}
