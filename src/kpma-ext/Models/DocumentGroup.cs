using kpma_ext.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("DocumentGroup", Schema = "core")]
	public class DocumentGroup: ILogModel, IDisplayName
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(200)]
		public string Name { get; set; }

		public string DisplayName { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }


		[InverseProperty("DocumentGroup")]
		[JsonIgnore]
		public List<DocumentType> Types { get; set; }
	}
}
