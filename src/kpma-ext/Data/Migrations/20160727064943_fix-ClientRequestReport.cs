using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
	public partial class fixClientRequestReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "ClientRequestReports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClientIntId",
                table: "ClientRequestReports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ContrInIntId",
                table: "ClientRequestReports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ContrOutIntId",
                table: "ClientRequestReports",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SupplierIntId",
                table: "ClientRequestReports",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "ClientRequestReports");

            migrationBuilder.DropColumn(
                name: "ClientIntId",
                table: "ClientRequestReports");

            migrationBuilder.DropColumn(
                name: "ContrInIntId",
                table: "ClientRequestReports");

            migrationBuilder.DropColumn(
                name: "ContrOutIntId",
                table: "ClientRequestReports");

            migrationBuilder.DropColumn(
                name: "SupplierIntId",
                table: "ClientRequestReports");
        }
    }
}
