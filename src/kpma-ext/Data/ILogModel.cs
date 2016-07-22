using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Data
{
    interface ILogModel
    {
		string CreatedBy { get; set; }
		DateTime CreatedDate { get; set; }
		string LastUpdatedBy { get; set; }
		DateTime LastUpdatedDate { get; set; }
	}
}
