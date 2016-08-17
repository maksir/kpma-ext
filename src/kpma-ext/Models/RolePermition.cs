using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("RolePermition", Schema = "meta")]
	public class RolePermition : ILogModel
	{
		public int MetaObjectId { get; set; }
		public int RoleId { get; set; }

		public bool CanRead { get; set; }
		public bool CanAdd { get; set; }
		public bool CanEdit { get; set; }
		public bool CanDelete { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("MetaObjectId")]
		public MetaObject MetaObject { get; set; }
		[ForeignKey("RoleId")]
		public Role Role { get; set; }
	}
}
