using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
	public partial class fixDocCardProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_DocCardProperty_DocumentGroupId_DocumentTypeId",
                schema: "doc",
                table: "DocCardProperty",
                columns: new[] { "DocumentGroupId", "DocumentTypeId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DocCardProperty_DocumentGroupId_DocumentTypeId",
                schema: "doc",
                table: "DocCardProperty");
        }
    }
}
