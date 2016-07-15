using kpma_ext.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kpma_ext.Data
{
	public class AppDbContext : IdentityDbContext<User, Role, int>
	{

		public User CurrentUser { get; set; }

		public DbSet<MetaObject> MetaObjects { get; set; }
		public DbSet<Menu> Menus { get; set; }
		public DbSet<RoleMenu> RoleMenus { get; set; }

		public DbSet<Contractor> Contractors { get; set; }


		public DbSet<DocumentGroup> DocumentGroups { get; set; }
		public DbSet<DocumentType> DocumentTypes { get; set; }


		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(@"Data Source=SR-SQL\MSSQL2012;Initial Catalog=kpma-ext;Persist Security Info=True;User ID=ext-user;Password=!u$eR-ex7");
		}


		public override int SaveChanges()
		{
			foreach (var entry in this.ChangeTracker.Entries())
			{
				switch (entry.State)
				{
					case EntityState.Detached:
						break;
					case EntityState.Unchanged:
						break;
					case EntityState.Deleted:
						break;
					case EntityState.Modified:
						{
							if (CurrentUser == null)
							{
								throw new Exception("В контексте не указан текущий пользователь! Сохранение не возможно!");
							}

							var model = entry.Entity as ILogModel;
							if (model != null)
							{
								model.LastUpdatedBy = CurrentUser.UserName;
								model.LastUpdatedDate = DateTime.Now;
							}
						}
						break;
					case EntityState.Added:
						{
							if (CurrentUser == null)
							{
								throw new Exception("В контексте не указан текущий пользователь! Сохранение не возможно!");
							}

							var model = entry.Entity as ILogModel;
							if (model != null)
							{
								model.CreatedBy = CurrentUser.UserName;
								model.CreatedDate = DateTime.Now;
								model.LastUpdatedBy = CurrentUser.UserName;
								model.LastUpdatedDate = DateTime.Now;
							}
						}
						break;
					default:
						break;
				}

			}
			return base.SaveChanges();
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// авторизация
			builder.Entity<User>().ToTable("User", "auth"); //.Property(p => p.Id).HasColumnName("Id");
			builder.Entity<User>().Property(p => p.DisplayName).HasComputedColumnSql("([Name] + ' (' + [Email] + ')')");

			builder.Entity<Role>().ToTable("Role", "auth");
			builder.Entity<IdentityUserRole<int>>().ToTable("UserRole", "auth");
			builder.Entity<IdentityUserLogin<int>>().ToTable("UserLogin", "auth");
			builder.Entity<IdentityUserClaim<int>>().ToTable("UserClaim", "auth");
			builder.Entity<IdentityUserToken<int>>().ToTable("UserToken", "auth");
			builder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaim", "auth");

			// метаданные
			builder.Entity<MetaObject>().HasOne(o => o.Type).WithMany(m => m.TypeCollection).HasForeignKey(f => f.TypeId).OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Restrict);
			builder.Entity<MetaObject>().HasIndex(p => new { p.Name, p.ParentId }).IsUnique();
			builder.Entity<MetaObject>().Property(p => p.DispalyName).HasComputedColumnSql("[Name]");
			builder.Entity<MetaObject>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<MetaObject>().Property(p => p.CreatedDate).HasDefaultValueSql("getdate()");

			// группы и типы документов
			builder.Entity<DocumentGroup>().ToTable("DocumentGroup", "core");
			builder.Entity<DocumentType>().ToTable("DocumentType", "core");

			//menu
			builder.Entity<Menu>().ToTable("Menu", "meta");
			builder.Entity<RoleMenu>().ToTable("RoleMenu", "meta").HasKey("RoleId", "MenuId");

			// контрагенты
			builder.Entity<Contractor>().ToTable("Contractor", "contr");
			builder.Entity<Contractor>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");

		}
	}
}
