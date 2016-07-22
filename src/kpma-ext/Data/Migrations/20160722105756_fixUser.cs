using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace kpmaext.Data.Migrations
{
    public partial class fixUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.DropIndex( //IX_User_ContractorId
				name: "IX_User_ContractorId",
				schema: "meta",
				table: "User"
				);

            migrationBuilder.AlterColumn<int>(
                name: "ContractorId",
                schema: "meta",
                table: "User",
                nullable: false);

			migrationBuilder.CreateIndex(
			   name: "IX_User_ContractorId",
			   schema: "meta",
			   table: "User",
			   column: "ContractorId");


		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ContractorId",
                schema: "meta",
                table: "User",
                nullable: true);
        }
    }
}
