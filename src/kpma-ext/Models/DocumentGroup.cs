using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
    public class DocumentGroup: ILogModel
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }

		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }


		[InverseProperty("DocumentGroup")]
		[JsonIgnore]
		public List<DocumentType> Types { get; set; }
	}
}
