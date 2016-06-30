using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class User_DisplayName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.DropColumn("DisplayName", "User", "auth");

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                schema: "auth",
                table: "User",
                nullable: true,
                computedColumnSql: "([Name] + ' (' + [Email] + ')')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.DropColumn("DisplayName", "User", "auth");

			migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                schema: "auth",
                table: "User",
                nullable: true,
                computedColumnSql: "[Name] ([Email])");
        }
    }
}
