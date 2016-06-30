using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
    public class RoleMenu
    {
		public int RoleId { get; set; }
		public int MenuId { get; set; }

		public Role Role { get; set; }
		public Menu Menu { get; set; }
	}
}
