using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("MetaObject", Schema ="meta")]
    public class MetaObject
    {
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }

		public int? ParentId { get; set; }
		[Required]
		public int TypeId { get; set; }

		public string Comment { get; set; }

		public string Value { get; set; }

		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		[ConcurrencyCheck]
		public DateTime LastUpdatedDate { get; set; }

		public string DispalyName { get; set; }


		[ForeignKey("ParentId")]
		public MetaObject Parent { get; set; }

		[ForeignKey("TypeId")]
		public MetaObject Type { get; set; }

		[InverseProperty("Parent")]
		public List<MetaObject> Children { get; set; }

		[InverseProperty("Type")]
		public List<MetaObject> TypeCollection { get; set; }
	}
}
