using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Data
{
    interface IDocModel
    {
		int DocNumber { get; set; }
		DateTime DocDate { get; set; }
		string Barcode { get; set; }
    }
}
