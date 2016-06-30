using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	//[Table("Menu", Schema = "meta")]
	public class Menu
    {
		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		public int? ParentId { get; set; }

		public string Url { get; set; }

		public bool IsGroup { get; set; }

		public int SortOrder { get; set; }

		public string Icon { get; set; }

		public bool OnRight { get; set; }

		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		[ConcurrencyCheck]
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("ParentId")]
		public Menu Parent { get; set; }

		[InverseProperty("Parent")]
		public List<Menu> Children { get; set; }

	}
}
