using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class ClientReport2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PersonStor",
                table: "ClientRequestReports",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PersonSert",
                table: "ClientRequestReports",
                maxLength: 500,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PersonStor",
                table: "ClientRequestReports",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PersonSert",
                table: "ClientRequestReports",
                maxLength: 200,
                nullable: true);
        }
    }
}
