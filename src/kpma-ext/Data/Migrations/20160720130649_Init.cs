using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace kpmaext.Data.Migrations
{
	public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "core");

            migrationBuilder.EnsureSchema(
                name: "contr");

            migrationBuilder.EnsureSchema(
                name: "doc");

            migrationBuilder.EnsureSchema(
                name: "meta");

            migrationBuilder.CreateTable(
                name: "Contractor",
                schema: "contr",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    FullName = table.Column<string>(maxLength: 500, nullable: true),
                    INN = table.Column<string>(maxLength: 12, nullable: true),
                    KPP = table.Column<string>(maxLength: 9, nullable: true),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    OGRN = table.Column<string>(maxLength: 15, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DocumentGroup",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menu",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Command = table.Column<string>(maxLength: 100, nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    Icon = table.Column<string>(maxLength: 50, nullable: true),
                    IsGroup = table.Column<bool>(nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    OnRight = table.Column<bool>(nullable: false),
                    ParentId = table.Column<int>(nullable: true),
                    SortOrder = table.Column<int>(nullable: false),
                    Url = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menu", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Menu_Menu_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "meta",
                        principalTable: "Menu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MetaObject",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Comment = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    ParentId = table.Column<int>(nullable: true),
                    SchemaName = table.Column<string>(maxLength: 10, nullable: true),
                    TableName = table.Column<string>(maxLength: 50, nullable: true),
                    TypeId = table.Column<int>(nullable: true),
                    Value = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetaObject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetaObject_MetaObject_ParentId",
                        column: x => x.ParentId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MetaObject_MetaObject_TypeId",
                        column: x => x.TypeId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserToken",
                schema: "meta",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserToken", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "Department",
                schema: "contr",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ContractorId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Department_Contractor_ContractorId",
                        column: x => x.ContractorId,
                        principalSchema: "contr",
                        principalTable: "Contractor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    ContractorId = table.Column<int>(nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "([Name] + ' (' + [Email] + ')')"),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    SecurityStamp = table.Column<string>(nullable: true),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Contractor_ContractorId",
                        column: x => x.ContractorId,
                        principalSchema: "contr",
                        principalTable: "Contractor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DocumentType",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BarcodeTemplate = table.Column<string>(maxLength: 100, nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    DocumentGroupId = table.Column<int>(nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentType", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentType_DocumentGroup_DocumentGroupId",
                        column: x => x.DocumentGroupId,
                        principalSchema: "core",
                        principalTable: "DocumentGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attachment",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ContentType = table.Column<string>(maxLength: 500, nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    File = table.Column<byte[]>(nullable: false),
                    FileName = table.Column<string>(maxLength: 500, nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Length = table.Column<long>(nullable: false),
                    MetaObjectId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    ObjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attachment_MetaObject_MetaObjectId",
                        column: x => x.MetaObjectId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ObjectIntegration",
                schema: "meta",
                columns: table => new
                {
                    MetaObjectId = table.Column<int>(nullable: false),
                    ObjectId = table.Column<int>(nullable: false),
                    SystemName = table.Column<string>(maxLength: 100, nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    SystemValue = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectIntegration", x => new { x.MetaObjectId, x.ObjectId, x.SystemName });
                    table.ForeignKey(
                        name: "FK_ObjectIntegration_MetaObject_MetaObjectId",
                        column: x => x.MetaObjectId,
                        principalSchema: "meta",
                        principalTable: "MetaObject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleMenu",
                schema: "meta",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false),
                    MenuId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleMenu", x => new { x.RoleId, x.MenuId });
                    table.ForeignKey(
                        name: "FK_RoleMenu_Menu_MenuId",
                        column: x => x.MenuId,
                        principalSchema: "meta",
                        principalTable: "Menu",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleMenu_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "meta",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleClaim",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaim_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "meta",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserDepartment",
                schema: "contr",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    DepartmentId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDepartment", x => new { x.UserId, x.DepartmentId });
                    table.ForeignKey(
                        name: "FK_UserDepartment_Department_DepartmentId",
                        column: x => x.DepartmentId,
                        principalSchema: "contr",
                        principalTable: "Department",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserDepartment_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "meta",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserClaim",
                schema: "meta",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaim_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "meta",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogin",
                schema: "meta",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogin", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogin_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "meta",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "meta",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "meta",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "meta",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocumentStatus",
                schema: "core",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Color = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "[Name]"),
                    DocumentTypeId = table.Column<int>(nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    OrderNumber = table.Column<int>(nullable: false),
                    Value = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentStatus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentStatus_DocumentType_DocumentTypeId",
                        column: x => x.DocumentTypeId,
                        principalSchema: "core",
                        principalTable: "DocumentType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocCard",
                schema: "doc",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AuthorId = table.Column<int>(nullable: false),
                    Barcode = table.Column<string>(maxLength: 50, nullable: true),
                    Content1 = table.Column<string>(nullable: true),
                    Content2 = table.Column<string>(nullable: true),
                    Content3 = table.Column<string>(nullable: true),
                    Content4 = table.Column<string>(nullable: true),
                    Content5 = table.Column<string>(nullable: true),
                    ContractorFromId = table.Column<int>(nullable: false),
                    ContractorToId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()"),
                    DepartmentFromId = table.Column<int>(nullable: false),
                    DepartmentToId = table.Column<int>(nullable: false),
                    DisplayName = table.Column<string>(nullable: true, computedColumnSql: "cast([DocNumber] as nvarchar) + ' от ' + convert(nvarchar(10), [DocDate], 104)"),
                    DocDate = table.Column<DateTime>(nullable: false),
                    DocNumber = table.Column<int>(nullable: false),
                    DocumentStatusId = table.Column<int>(nullable: false),
                    DocumentTypeId = table.Column<int>(nullable: false),
                    LastUpdatedBy = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "suser_sname()"),
                    LastUpdatedDate = table.Column<DateTime>(nullable: false, defaultValueSql: "sysdatetime()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocCard", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocCard_User_AuthorId",
                        column: x => x.AuthorId,
                        principalSchema: "meta",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocCard_Contractor_ContractorFromId",
                        column: x => x.ContractorFromId,
                        principalSchema: "contr",
                        principalTable: "Contractor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DocCard_Contractor_ContractorToId",
                        column: x => x.ContractorToId,
                        principalSchema: "contr",
                        principalTable: "Contractor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DocCard_Department_DepartmentFromId",
                        column: x => x.DepartmentFromId,
                        principalSchema: "contr",
                        principalTable: "Department",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DocCard_Department_DepartmentToId",
                        column: x => x.DepartmentToId,
                        principalSchema: "contr",
                        principalTable: "Department",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DocCard_DocumentStatus_DocumentStatusId",
                        column: x => x.DocumentStatusId,
                        principalSchema: "core",
                        principalTable: "DocumentStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DocCard_DocumentType_DocumentTypeId",
                        column: x => x.DocumentTypeId,
                        principalSchema: "core",
                        principalTable: "DocumentType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attachment_MetaObjectId",
                schema: "core",
                table: "Attachment",
                column: "MetaObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Department_ContractorId",
                schema: "contr",
                table: "Department",
                column: "ContractorId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_AuthorId",
                schema: "doc",
                table: "DocCard",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_ContractorFromId",
                schema: "doc",
                table: "DocCard",
                column: "ContractorFromId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_ContractorToId",
                schema: "doc",
                table: "DocCard",
                column: "ContractorToId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_DepartmentFromId",
                schema: "doc",
                table: "DocCard",
                column: "DepartmentFromId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_DepartmentToId",
                schema: "doc",
                table: "DocCard",
                column: "DepartmentToId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_DocumentStatusId",
                schema: "doc",
                table: "DocCard",
                column: "DocumentStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_DocCard_DocumentTypeId",
                schema: "doc",
                table: "DocCard",
                column: "DocumentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentStatus_DocumentTypeId",
                schema: "core",
                table: "DocumentStatus",
                column: "DocumentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentStatus_Name_DocumentTypeId",
                schema: "core",
                table: "DocumentStatus",
                columns: new[] { "Name", "DocumentTypeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DocumentType_DocumentGroupId",
                schema: "core",
                table: "DocumentType",
                column: "DocumentGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentType_Name_DocumentGroupId",
                schema: "core",
                table: "DocumentType",
                columns: new[] { "Name", "DocumentGroupId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menu_ParentId",
                schema: "meta",
                table: "Menu",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_ParentId",
                schema: "meta",
                table: "MetaObject",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_TableName",
                schema: "meta",
                table: "MetaObject",
                column: "TableName");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_TypeId",
                schema: "meta",
                table: "MetaObject",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MetaObject_Name_ParentId",
                schema: "meta",
                table: "MetaObject",
                columns: new[] { "Name", "ParentId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ObjectIntegration_MetaObjectId",
                schema: "meta",
                table: "ObjectIntegration",
                column: "MetaObjectId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                schema: "meta",
                table: "Role",
                column: "NormalizedName");

            migrationBuilder.CreateIndex(
                name: "IX_RoleMenu_MenuId",
                schema: "meta",
                table: "RoleMenu",
                column: "MenuId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleMenu_RoleId",
                schema: "meta",
                table: "RoleMenu",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_User_ContractorId",
                schema: "meta",
                table: "User",
                column: "ContractorId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                schema: "meta",
                table: "User",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                schema: "meta",
                table: "User",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserDepartment_DepartmentId",
                schema: "contr",
                table: "UserDepartment",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_UserDepartment_UserId",
                schema: "contr",
                table: "UserDepartment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaim_RoleId",
                schema: "meta",
                table: "RoleClaim",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaim_UserId",
                schema: "meta",
                table: "UserClaim",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_UserId",
                schema: "meta",
                table: "UserLogin",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                schema: "meta",
                table: "UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_UserId",
                schema: "meta",
                table: "UserRole",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attachment",
                schema: "core");

            migrationBuilder.DropTable(
                name: "DocCard",
                schema: "doc");

            migrationBuilder.DropTable(
                name: "ObjectIntegration",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "RoleMenu",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "Service",
                schema: "core");

            migrationBuilder.DropTable(
                name: "UserDepartment",
                schema: "contr");

            migrationBuilder.DropTable(
                name: "RoleClaim",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "UserClaim",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "UserLogin",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "UserToken",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "DocumentStatus",
                schema: "core");

            migrationBuilder.DropTable(
                name: "MetaObject",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "Menu",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "Department",
                schema: "contr");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "User",
                schema: "meta");

            migrationBuilder.DropTable(
                name: "DocumentType",
                schema: "core");

            migrationBuilder.DropTable(
                name: "Contractor",
                schema: "contr");

            migrationBuilder.DropTable(
                name: "DocumentGroup",
                schema: "core");
        }
    }
}
