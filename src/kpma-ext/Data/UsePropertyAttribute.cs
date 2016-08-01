using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Data
{
	[AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
	sealed class UsePropertyAttribute : Attribute
	{
		public UsePropertyAttribute()
		{
		}

	}
}
