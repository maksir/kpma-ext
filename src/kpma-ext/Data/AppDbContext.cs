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

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(@"Data Source=SR-SQL\MSSQL2012;Initial Catalog=kpma-ext;Persist Security Info=True;User ID=ext-user;Password=!u$eR-ex7");
		}


		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			//авторизация
			builder.Entity<User>().ToTable("User", "auth"); //.Property(p => p.Id).HasColumnName("Id");
			builder.Entity<Role>().ToTable("Role", "auth");
			builder.Entity<IdentityUserRole<int>>().ToTable("UserRole", "auth");
			builder.Entity<IdentityUserLogin<int>>().ToTable("UserLogin", "auth");
			builder.Entity<IdentityUserClaim<int>>().ToTable("UserClaim", "auth");
			builder.Entity<IdentityUserToken<int>>().ToTable("UserToken", "auth");
			builder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaim", "auth");
		}
	}
}
