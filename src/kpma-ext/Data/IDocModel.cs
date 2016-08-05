using System;

namespace kpma_ext.Data
{
	interface IDocModel
    {
		int DocNumber { get; set; }
		DateTime DocDate { get; set; }
		string Barcode { get; set; }
    }
}
