using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("DataRestriction", Schema = "meta")]
	public class DataRestriction : ILogModel
    {
		public int DepartmentId { get; set; }
		public int MetaObjectId { get; set; }
		public int ObjectId { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("DepartmentId")]
		public Department Department { get; set; }
		[ForeignKey("MetaObjectId")]
		public MetaObject MetaObject { get; set; }
	}
}
