using kpma_ext.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("RoleMenu", Schema = "meta")]
	public class RoleMenu: ILogModel
    {
		public int RoleId { get; set; }
		public int MenuId { get; set; }

		public Role Role { get; set; }
		public Menu Menu { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

	}
}
