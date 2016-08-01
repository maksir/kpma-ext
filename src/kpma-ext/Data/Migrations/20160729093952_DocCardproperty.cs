using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace kpmaext.Data.Migrations
{
    public partial class DocCardproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DocCardProperty",
                schema: "doc",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DocumentGroupId = table.Column<int>(nullable: false),
                    DocumentTypeId = table.Column<int>(nullable: true),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocCardProperty", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocCardProperty_DocumentGroup_DocumentGroupId",
                        column: x => x.DocumentGroupId,
                        principalSchema: "core",
                        principalTable: "DocumentGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocCardProperty_DocumentType_DocumentTypeId",
                        column: x => x.DocumentTypeId,
                        principalSchema: "core",
                        principalTable: "DocumentType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DocCardPropertyField",
                schema: "doc",
                columns: table => new
                {
                    DocCardPropertyId = table.Column<int>(nullable: false),
                    FieldName = table.Column<string>(maxLength: 100, nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(maxLength: 100, nullable: true),
                    IsMandatory = table.Column<bool>(nullable: false, defaultValue: false),
                    IsShown = table.Column<bool>(nullable: false, defaultValue: true),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocCardPropertyField", x => new { x.DocCardPropertyId, x.FieldName });
                    table.ForeignKey(
                        name: "FK_DocCardPropertyField_DocCardProperty_DocCardPropertyId",
                        column: x => x.DocCardPropertyId,
                        principalSchema: "doc",
                        principalTable: "DocCardProperty",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocCardProperty_DocumentGroupId",
                schema: "doc",
                table: "DocCardProperty",
                column: "DocumentGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCardProperty_DocumentTypeId",
                schema: "doc",
                table: "DocCardProperty",
                column: "DocumentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCardPropertyField_DocCardPropertyId",
                schema: "doc",
                table: "DocCardPropertyField",
                column: "DocCardPropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocCardPropertyField",
                schema: "doc");

            migrationBuilder.DropTable(
                name: "DocCardProperty",
                schema: "doc");
        }
    }
}
