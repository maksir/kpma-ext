using kpma_ext.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Models
{
	[Table("DocCard", Schema = "doc")]
	public class DocCard : IDocModel, IDisplayName, ILogModel
	{
		[Key]
		public int Id { get; set; }
		public int DocNumber { get; set; }
		public DateTime DocDate { get; set; }
		[MaxLength(50)]
		public string Barcode { get; set; }
		
		public string DisplayName { get; set; }

		public int DocumentTypeId { get; set; }
		public int DocumentStatusId { get; set; }

		public int ContractorFromId { get; set; }
		public int ContractorToId { get; set; }

		public int DepartmentFromId { get; set; }
		public int DepartmentToId { get; set; }

		public int AuthorId { get; set; }

		[UseProperty]
		public string Content1 { get; set; }
		[UseProperty]
		public string Content2 { get; set; }
		[UseProperty]
		public string Content3 { get; set; }
		[UseProperty]
		public string Content4 { get; set; }
		[UseProperty]
		public string Content5 { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("DocumentTypeId")]
		public DocumentType DocumentType { get; set; }
		[ForeignKey("DocumentStatusId")]
		public DocumentStatus DocumentStatus { get; set; }
		[ForeignKey("ContractorFromId")]
		public Contractor ContractorFrom { get; set; }
		[ForeignKey("ContractorToId")]
		public Contractor ContractorTo { get; set; }
		[ForeignKey("DepartmentFromId")]
		public Department DepartmentFrom { get; set; }
		[ForeignKey("DepartmentToId")]
		public Department DepartmentTo { get; set; }
		[ForeignKey("AuthorId")]
		public User Author { get; set; }
		
	}
}
