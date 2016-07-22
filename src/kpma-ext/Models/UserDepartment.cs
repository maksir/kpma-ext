using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("UserDepartment", Schema = "contr")]
	public class UserDepartment : ILogModel
	{
		public int UserId { get; set; }
		public int DepartmentId { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("UserId")]
		public User User { get; set; }

		[ForeignKey("DepartmentId")]
		public Department Department { get; set; }

	}
}
