using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace kpmaext.Data.Migrations
{
	public partial class ClientRequestReport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientRequestReports",
                columns: table => new
                {
                    ClientRequestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Barcode = table.Column<string>(maxLength: 200, nullable: true),
                    CargoName = table.Column<string>(maxLength: 200, nullable: true),
                    CargoReadyDate = table.Column<DateTime>(nullable: false),
                    ClientDate = table.Column<DateTime>(nullable: false),
                    ClientNumber = table.Column<string>(maxLength: 200, nullable: true),
                    ContrInId = table.Column<int>(nullable: false),
                    ContrOutId = table.Column<int>(nullable: false),
                    CtrExec = table.Column<string>(maxLength: 200, nullable: true),
                    DEndFactTre = table.Column<DateTime>(nullable: false),
                    DEndFactTrs = table.Column<DateTime>(nullable: false),
                    DSert = table.Column<DateTime>(nullable: false),
                    DStFactTre = table.Column<DateTime>(nullable: false),
                    DStFactTrs = table.Column<DateTime>(nullable: false),
                    DStor = table.Column<DateTime>(nullable: false),
                    DTNumber = table.Column<string>(maxLength: 200, nullable: true),
                    DateCustoms = table.Column<DateTime>(nullable: false),
                    DateInFact = table.Column<DateTime>(nullable: false),
                    DateOutFact = table.Column<DateTime>(nullable: false),
                    Perc = table.Column<decimal>(nullable: false),
                    PersonBeginTO = table.Column<string>(maxLength: 200, nullable: true),
                    PersonCl = table.Column<string>(maxLength: 200, nullable: true),
                    PersonEndTO = table.Column<string>(maxLength: 200, nullable: true),
                    PersonSert = table.Column<string>(maxLength: 200, nullable: true),
                    PersonStor = table.Column<string>(maxLength: 200, nullable: true),
                    PersonTO = table.Column<string>(maxLength: 200, nullable: true),
                    ProcName = table.Column<string>(maxLength: 200, nullable: true),
                    StatusBeginTO = table.Column<string>(maxLength: 200, nullable: true),
                    StatusEndTO = table.Column<string>(maxLength: 200, nullable: true),
                    StatusSert = table.Column<string>(maxLength: 200, nullable: true),
                    StatusStor = table.Column<string>(maxLength: 200, nullable: true),
                    StatusTO = table.Column<string>(maxLength: 200, nullable: true),
                    SupplierId = table.Column<int>(nullable: false),
                    TTNNumber = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientRequestReports", x => x.ClientRequestId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientRequestReports");
        }
    }
}
