using kpma_ext.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("DocCardPropertyField", Schema = "doc")]
	public class DocCardPropertyField : ILogModel
	{
		public int DocCardPropertyId { get; set; }
		[MaxLength(100)]
		public string FieldName { get; set; }
		[MaxLength(100)]
		public string DisplayName { get; set; }
		public bool IsMandatory { get; set; }
		public bool IsShown { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("DocCardPropertyId")]
		public DocCardProperty DocCardProperty { get; set; }
	}
}
