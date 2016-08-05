using kpma_ext.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace kpma_ext.Data
{
	public class AppDbContext : IdentityDbContext<User, Role, int>
	{

		public User CurrentUser { get; set; }

		public DbSet<MetaObject> MetaObjects { get; set; }
		public DbSet<ObjectIntegration> ObjectIntegrations { get; set; }
		public DbSet<Menu> Menus { get; set; }
		public DbSet<RoleMenu> RoleMenus { get; set; }

		public DbSet<DataRestriction> DataRestrictions { get; set; }

		public DbSet<Contractor> Contractors { get; set; }

		public DbSet<Service> Services { get; set; }
		public DbSet<Department> Departments { get; set; }
		public DbSet<UserDepartment> UserDepartments { get; set; }

		public DbSet<DocumentGroup> DocumentGroups { get; set; }
		public DbSet<DocumentType> DocumentTypes { get; set; }
		public DbSet<DocumentStatus> DocumentStatuses { get; set; }

		public DbSet<Attachment> Attachments { get; set; }
		public DbSet<DocCard> DocCards { get; set; }

		public DbSet<DocCardProperty> DocCardProperties { get; set;}

		public DbSet<DocCardPropertyField> DocCardPropertyFields { get; set; }

		public DbSet<Chat> Chats { get; set; }
		public DbSet<ChatRead> ChatReads { get; set; }

		public DbSet<ClientRequestReport> ClientRequestReports { get; set; }

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
			builder.Entity<User>().ToTable("User", schema: "meta");
			builder.Entity<User>().HasOne(o => o.Contractor).WithMany().HasForeignKey(f => f.ContractorId).OnDelete(DeleteBehavior.Restrict);
			builder.Entity<User>().Property(p => p.DisplayName).HasComputedColumnSql("([Name] + ' (' + [Email] + ')')");
			builder.Entity<User>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<User>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<User>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<User>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			builder.Entity<Role>().ToTable("Role", schema: "meta");
			builder.Entity<Role>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<Role>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Role>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Role>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Role>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			builder.Entity<IdentityUserRole<int>>().ToTable("UserRole", "meta");
			builder.Entity<IdentityUserLogin<int>>().ToTable("UserLogin", "meta");
			builder.Entity<IdentityUserClaim<int>>().ToTable("UserClaim", "meta");
			builder.Entity<IdentityUserToken<int>>().ToTable("UserToken", "meta");
			builder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaim", "meta");

			// метаданные
			builder.Entity<MetaObject>().HasOne(o => o.Type).WithMany(m => m.TypeCollection).HasForeignKey(f => f.TypeId).OnDelete(DeleteBehavior.Restrict);
			builder.Entity<MetaObject>().HasIndex(p => new { p.Name, p.ParentId }).IsUnique();
			builder.Entity<MetaObject>().HasIndex(p => p.TableName);
			builder.Entity<MetaObject>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<MetaObject>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<MetaObject>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<MetaObject>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<MetaObject>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// интеграция с другими системами
			builder.Entity<ObjectIntegration>().HasKey("MetaObjectId", "ObjectId", "SystemName");
			builder.Entity<ObjectIntegration>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<ObjectIntegration>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<ObjectIntegration>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<ObjectIntegration>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// ограничение доступа по записям
			builder.Entity<DataRestriction>().HasKey("DepartmentId", "MetaObjectId", "ObjectId");
			builder.Entity<DataRestriction>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DataRestriction>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DataRestriction>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DataRestriction>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// группы документов
			builder.Entity<DocumentGroup>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<DocumentGroup>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocumentGroup>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocumentGroup>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocumentGroup>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// типы документов
			builder.Entity<DocumentType>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<DocumentType>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocumentType>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocumentType>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocumentType>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocumentType>().HasIndex(p => new { p.Name, p.DocumentGroupId }).IsUnique();

			// статусы документов
			builder.Entity<DocumentStatus>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<DocumentStatus>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocumentStatus>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocumentStatus>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocumentStatus>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocumentStatus>().HasIndex(p => new { p.Name, p.DocumentTypeId }).IsUnique();

			//menu
			builder.Entity<Menu>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<Menu>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Menu>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Menu>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Menu>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			builder.Entity<RoleMenu>().HasKey("RoleId", "MenuId");
			builder.Entity<RoleMenu>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<RoleMenu>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<RoleMenu>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<RoleMenu>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// контрагенты
			builder.Entity<Contractor>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<Contractor>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Contractor>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Contractor>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Contractor>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");


			// службы, получатели корреспонденции
			builder.Entity<Service>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<Service>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Service>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Service>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Service>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// подразделения контрагентов - будут получателями корреспонденции
			builder.Entity<Department>().Property(p => p.DisplayName).HasComputedColumnSql("[Name]");
			builder.Entity<Department>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Department>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Department>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Department>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			builder.Entity<UserDepartment>().HasKey("UserId", "DepartmentId");
			builder.Entity<UserDepartment>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<UserDepartment>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<UserDepartment>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<UserDepartment>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// вложения
			builder.Entity<Attachment>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Attachment>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Attachment>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Attachment>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// запросы
			builder.Entity<DocCard>().Property(p => p.DocNumber).HasComputedColumnSql("[Id]");
			builder.Entity<DocCard>().Property(p => p.DisplayName).HasComputedColumnSql("cast([Id] as nvarchar) + ' от ' + convert(nvarchar(10), [DocDate], 104)");
			builder.Entity<DocCard>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocCard>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocCard>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocCard>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocCard>().HasOne(f => f.ContractorFrom).WithMany().OnDelete(DeleteBehavior.Restrict);
			builder.Entity<DocCard>().HasOne(f => f.ContractorTo).WithMany().OnDelete(DeleteBehavior.Restrict);
			builder.Entity<DocCard>().HasOne(f => f.DepartmentFrom).WithMany().OnDelete(DeleteBehavior.Restrict);
			builder.Entity<DocCard>().HasOne(f => f.DepartmentTo).WithMany().OnDelete(DeleteBehavior.Restrict);
			builder.Entity<DocCard>().HasOne(f => f.DocumentStatus).WithMany().OnDelete(DeleteBehavior.Restrict);
			builder.Entity<DocCard>().HasOne(f => f.DocumentType).WithMany().OnDelete(DeleteBehavior.Restrict);

			// чат
			builder.Entity<Chat>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Chat>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<Chat>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<Chat>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");


			// прочитанный чат
			builder.Entity<ChatRead>().HasKey("DepartmentId", "ChatId");
			builder.Entity<ChatRead>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<ChatRead>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<ChatRead>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<ChatRead>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// настройки
			builder.Entity<DocCardProperty>().HasIndex("DocumentGroupId", "DocumentTypeId").IsUnique();
			builder.Entity<DocCardProperty>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocCardProperty>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocCardProperty>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocCardProperty>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");

			// настройки
			builder.Entity<DocCardPropertyField>().HasKey("DocCardPropertyId", "FieldName");
			builder.Entity<DocCardPropertyField>().Property(p => p.IsMandatory).HasDefaultValue(false);
			builder.Entity<DocCardPropertyField>().Property(p => p.IsShown).HasDefaultValue(true);
			builder.Entity<DocCardPropertyField>().Property(p => p.CreatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocCardPropertyField>().Property(p => p.CreatedDate).HasDefaultValueSql("sysdatetime()");
			builder.Entity<DocCardPropertyField>().Property(p => p.LastUpdatedBy).HasDefaultValueSql("suser_sname()");
			builder.Entity<DocCardPropertyField>().Property(p => p.LastUpdatedDate).HasDefaultValueSql("sysdatetime()");
		}
	}
}
