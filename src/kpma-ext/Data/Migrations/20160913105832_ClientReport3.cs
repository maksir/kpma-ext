using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class ClientReport3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DTNumber",
                table: "ClientRequestReports",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CargoName",
                table: "ClientRequestReports",
                maxLength: 500,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DTNumber",
                table: "ClientRequestReports",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CargoName",
                table: "ClientRequestReports",
                maxLength: 200,
                nullable: true);
        }
    }
}
