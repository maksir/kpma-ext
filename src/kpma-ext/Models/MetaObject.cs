using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("MetaObject", Schema ="meta")]
    public class MetaObject: ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(200)]
		public string Name { get; set; }

		public int? ParentId { get; set; }
		
		public int? TypeId { get; set; }
		[MaxLength(500)]
		public string Comment { get; set; }
		[MaxLength(50)]
		public string Value { get; set; }
		[MaxLength(50)]
		public string TableName { get; set; }
		[MaxLength(10)]
		public string SchemaName { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		public string DisplayName { get; set; }


		[ForeignKey("ParentId")]
		public MetaObject Parent { get; set; }
		public MetaObject Type { get; set; }

		[InverseProperty("Parent")]
		public List<MetaObject> Children { get; set; }
		public List<MetaObject> TypeCollection { get; set; }
	}
}
