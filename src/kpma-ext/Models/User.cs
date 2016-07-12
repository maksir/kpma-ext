using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
    public class User : IdentityUser<int>
	{
		public string Name { get; set; }
		public string DisplayName { get; set; }

		public int? ContractorId { get; set; }

		[ForeignKey("ContractorId")]
		public Contractor Contractor { get; set; }
	}
}
