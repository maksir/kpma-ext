using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
    public class Contractor
    {
		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		public string FullName { get; set; }

		public string DisplayName { get; set; }

		public string INN { get; set; }

		public string KPP { get; set; }

		public string OGRN { get; set; }


		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		[ConcurrencyCheck]
		public DateTime LastUpdatedDate { get; set; }
	}
}
