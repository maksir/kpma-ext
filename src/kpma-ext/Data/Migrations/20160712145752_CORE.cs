using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace kpmaext.Data.Migrations
{
    public partial class CORE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "core");

            migrationBuilder.CreateTable(
                name: "DocumentGroup",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    LastUpdatedBy = table.Column<string>(nullable: true),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DocumentType",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    DocumentGroupId = table.Column<int>(nullable: false),
                    LastUpdatedBy = table.Column<string>(nullable: true),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentType_DocumentGroup_DocumentGroupId",
                        column: x => x.DocumentGroupId,
                        principalSchema: "core",
                        principalTable: "DocumentGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<int>(
                name: "ContractorId",
                schema: "auth",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SchemaName",
                schema: "meta",
                table: "MetaObject",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TableName",
                schema: "meta",
                table: "MetaObject",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Command",
                schema: "meta",
                table: "Menu",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "INN",
                schema: "contr",
                table: "Contractor",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KPP",
                schema: "contr",
                table: "Contractor",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OGRN",
                schema: "contr",
                table: "Contractor",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_ContractorId",
                schema: "auth",
                table: "User",
                column: "ContractorId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentType_DocumentGroupId",
                schema: "core",
                table: "DocumentType",
                column: "DocumentGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Contractor_ContractorId",
                schema: "auth",
                table: "User",
                column: "ContractorId",
                principalSchema: "contr",
                principalTable: "Contractor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Contractor_ContractorId",
                schema: "auth",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_ContractorId",
                schema: "auth",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ContractorId",
                schema: "auth",
                table: "User");

            migrationBuilder.DropColumn(
                name: "SchemaName",
                schema: "meta",
                table: "MetaObject");

            migrationBuilder.DropColumn(
                name: "TableName",
                schema: "meta",
                table: "MetaObject");

            migrationBuilder.DropColumn(
                name: "Command",
                schema: "meta",
                table: "Menu");

            migrationBuilder.DropColumn(
                name: "INN",
                schema: "contr",
                table: "Contractor");

            migrationBuilder.DropColumn(
                name: "KPP",
                schema: "contr",
                table: "Contractor");

            migrationBuilder.DropColumn(
                name: "OGRN",
                schema: "contr",
                table: "Contractor");

            migrationBuilder.DropTable(
                name: "DocumentType",
                schema: "core");

            migrationBuilder.DropTable(
                name: "DocumentGroup",
                schema: "core");
        }
    }
}
