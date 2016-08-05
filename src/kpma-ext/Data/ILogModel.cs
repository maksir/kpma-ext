using System;

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
