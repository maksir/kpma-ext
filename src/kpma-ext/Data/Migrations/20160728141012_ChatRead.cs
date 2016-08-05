using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
	public partial class ChatRead : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChatRead",
                schema: "mess",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(nullable: false),
                    ChatId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatRead", x => new { x.DepartmentId, x.ChatId });
                });
           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatRead",
                schema: "mess");
           
        }
    }
}
