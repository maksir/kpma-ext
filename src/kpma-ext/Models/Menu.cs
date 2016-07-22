using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("Menu", Schema = "meta")]
	public class Menu: ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(200)]
		public string Name { get; set; }

		public string DisplayName { get; set; }

		public int? ParentId { get; set; }

		[MaxLength(200)]
		public string Url { get; set; }

		public bool IsGroup { get; set; }

		public int SortOrder { get; set; }

		[MaxLength(50)]
		public string Icon { get; set; }

		public bool OnRight { get; set; }

		[MaxLength(100)]
		public string Command { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("ParentId")]
		public Menu Parent { get; set; }

		[InverseProperty("Parent")]
		public List<Menu> Children { get; set; }

	}
}
