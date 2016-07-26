using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class DataRestriction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataRestriction",
                schema: "meta",
                columns: table => new
                {
                    DepartmentId = table.Column<int>(nullable: false),
                    MetaObjectId = table.Column<int>(nullable: false),
                    ObjectId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataRestriction", x => new { x.DepartmentId, x.MetaObjectId, x.ObjectId });
                    table.ForeignKey(
                        name: "FK_DataRestriction_Department_DepartmentId",
                        column: x => x.DepartmentId,
                        principalSchema: "contr",
                        principalTable: "Department",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataRestriction_MetaObject_MetaObjectId",
                        column: x => x.MetaObjectId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DataRestriction_DepartmentId",
                schema: "meta",
                table: "DataRestriction",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_DataRestriction_MetaObjectId",
                schema: "meta",
                table: "DataRestriction",
                column: "MetaObjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataRestriction",
                schema: "meta");
        }
    }
}
