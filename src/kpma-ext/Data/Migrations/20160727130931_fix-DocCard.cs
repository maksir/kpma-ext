using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
	public partial class fixDocCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.DropColumn(
				name: "DisplayName",
				schema: "doc",
				table: "DocCard"
				);

			migrationBuilder.DropColumn(
				name: "DocNumber",
				schema: "doc",
				table: "DocCard"
				);

			migrationBuilder.AddColumn<int>(
                name: "DocNumber",
                schema: "doc",
                table: "DocCard",
                nullable: false,
                computedColumnSql: "[Id]");

			migrationBuilder.AddColumn<string>(
				name: "DisplayName",
				schema: "doc",
				table: "DocCard",
				nullable: false,
				computedColumnSql: "cast([Id] as nvarchar) + ' от ' + convert(nvarchar(10), [DocDate], 104)");


		}

		protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DocNumber",
                schema: "doc",
                table: "DocCard",
                nullable: false);
        }
    }
}
