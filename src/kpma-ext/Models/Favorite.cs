using kpma_ext.Data;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kpma_ext.Models
{
	[Table("ObjectFavorite", Schema = "meta")]
	public class ObjectFavorite : ILogModel
	{
		public int UserId { get; set; }
		public int MetaObjectId { get; set; }
		public int ObjectId { get; set; }

		[MaxLength(100)]
		public string CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
		[MaxLength(100)]
		public string LastUpdatedBy { get; set; }
		public DateTime LastUpdatedDate { get; set; }

		[ForeignKey("UserId")]
		public User User { get; set; }

		[ForeignKey("MetaObjectId")]
		public MetaObject MetaObject { get; set; }
	}
}
