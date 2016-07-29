using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class fixObjectIntagration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SystemValue",
                schema: "meta",
                table: "ObjectIntegration");

            migrationBuilder.AddColumn<int>(
                name: "SystemId",
                schema: "meta",
                table: "ObjectIntegration",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SystemId",
                schema: "meta",
                table: "ObjectIntegration");

            migrationBuilder.AddColumn<string>(
                name: "SystemValue",
                schema: "meta",
                table: "ObjectIntegration",
                maxLength: 100,
                nullable: true);
        }
    }
}
