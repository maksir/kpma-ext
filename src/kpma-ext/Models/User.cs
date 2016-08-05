using kpma_ext.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("User", Schema = "meta")]
	public class User : IdentityUser<int>, ILogModel, IDisplayName
	{
		[MaxLength(200)]
		public string Name { get; set; }
		public string DisplayName { get; set; }

		public int ContractorId { get; set; }

		[ForeignKey("ContractorId")]
		public Contractor Contractor { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }
	}
}
