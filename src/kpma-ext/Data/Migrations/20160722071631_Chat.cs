using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace kpmaext.Data.Migrations
{
	public partial class Chat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "mess");

            migrationBuilder.CreateTable(
                name: "Chat",
                schema: "mess",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AuthorId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DepartmentId = table.Column<int>(nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    MessageText = table.Column<string>(nullable: true),
                    MetaObjectId = table.Column<int>(nullable: false),
                    ObjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chat_User_AuthorId",
                        column: x => x.AuthorId,
                        principalSchema: "meta",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Chat_Department_DepartmentId",
                        column: x => x.DepartmentId,
                        principalSchema: "contr",
                        principalTable: "Department",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Chat_MetaObject_MetaObjectId",
                        column: x => x.MetaObjectId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chat_AuthorId",
                schema: "mess",
                table: "Chat",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_DepartmentId",
                schema: "mess",
                table: "Chat",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_MetaObjectId",
                schema: "mess",
                table: "Chat",
                column: "MetaObjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chat",
                schema: "mess");
        }
    }
}
