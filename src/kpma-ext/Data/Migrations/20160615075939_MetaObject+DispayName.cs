using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace kpmaext.Data.Migrations
{
    public partial class MetaObjectDispayName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "meta");

            migrationBuilder.CreateTable(
                name: "MetaObject",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Comment = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    DispalyName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    LastUpdatedBy = table.Column<string>(nullable: true),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    ParentId = table.Column<int>(nullable: true),
                    TypeId = table.Column<int>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetaObject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetaObject_MetaObject_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MetaObject_MetaObject_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                schema: "auth",
                table: "User",
                nullable: true,
                computedColumnSql: "[Name] ([Email])");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_ParentId",
                schema: "meta",
                table: "MetaObject",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_TypeId",
                schema: "meta",
                table: "MetaObject",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_Name_ParentId",
                schema: "meta",
                table: "MetaObject",
                columns: new[] { "Name", "ParentId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayName",
                schema: "auth",
                table: "User");

            migrationBuilder.DropTable(
                name: "MetaObject",
                schema: "meta");
        }
    }
}
