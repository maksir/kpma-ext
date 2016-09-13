using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class ClientReport4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SupplierIntId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SupplierId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOutFact",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateInFact",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCustoms",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DStor",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DStFactTrs",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DStFactTre",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DSert",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DEndFactTrs",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DEndFactTre",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContrOutIntId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContrOutId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContrInIntId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ContrInId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientIntId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ClientDate",
                table: "ClientRequestReports",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CargoReadyDate",
                table: "ClientRequestReports",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SupplierIntId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "SupplierId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOutFact",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateInFact",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCustoms",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DStor",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DStFactTrs",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DStFactTre",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DSert",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DEndFactTrs",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DEndFactTre",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ContrOutIntId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ContrOutId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ContrInIntId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ContrInId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ClientIntId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ClientDate",
                table: "ClientRequestReports",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CargoReadyDate",
                table: "ClientRequestReports",
                nullable: false);
        }
    }
}
