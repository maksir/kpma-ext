using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
    public class DocumentType
    {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }

		public int DocumentGroupId { get; set; }

		[ForeignKey("DocumentGroupId")]
		public DocumentGroup DocumenyGroup { get; set; }

		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		[ConcurrencyCheck]
		public DateTime LastUpdatedDate { get; set; }
	}
}
