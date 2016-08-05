using System;

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
