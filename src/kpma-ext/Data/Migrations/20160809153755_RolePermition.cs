using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class RolePermition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RolePermition",
                schema: "meta",
                columns: table => new
                {
                    MetaObjectId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false),
                    CanAdd = table.Column<bool>(nullable: false),
                    CanDelete = table.Column<bool>(nullable: false),
                    CanEdit = table.Column<bool>(nullable: false),
                    CanRead = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermition", x => new { x.MetaObjectId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_RolePermition_MetaObject_MetaObjectId",
                        column: x => x.MetaObjectId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermition_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "meta",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RolePermition_MetaObjectId",
                schema: "meta",
                table: "RolePermition",
                column: "MetaObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermition_RoleId",
                schema: "meta",
                table: "RolePermition",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RolePermition",
                schema: "meta");
        }
    }
}
