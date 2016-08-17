using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using kpma_ext.Data;

namespace kpmaext.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("kpma_ext.Models.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContentType")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 500);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<byte[]>("File")
                        .IsRequired();

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 500);

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<long>("Length");

                    b.Property<int>("MetaObjectId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<int>("ObjectId");

                    b.HasKey("Id");

                    b.HasIndex("MetaObjectId");

                    b.ToTable("Attachment","core");
                });

            modelBuilder.Entity("kpma_ext.Models.Chat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AuthorId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<int>("DepartmentId");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("MessageText");

                    b.Property<int>("MetaObjectId");

                    b.Property<int>("ObjectId");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("MetaObjectId");

                    b.ToTable("Chat","mess");
                });

            modelBuilder.Entity("kpma_ext.Models.ChatRead", b =>
                {
                    b.Property<int>("DepartmentId");

                    b.Property<int>("ChatId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("DepartmentId", "ChatId");

                    b.ToTable("ChatRead","mess");
                });

            modelBuilder.Entity("kpma_ext.Models.ClientRequestReport", b =>
                {
                    b.Property<int>("ClientRequestId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Barcode")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("CargoName")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<DateTime>("CargoReadyDate");

                    b.Property<DateTime>("ClientDate");

                    b.Property<int>("ClientId");

                    b.Property<int>("ClientIntId");

                    b.Property<string>("ClientNumber")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<int>("ContrInId");

                    b.Property<int>("ContrInIntId");

                    b.Property<int>("ContrOutId");

                    b.Property<int>("ContrOutIntId");

                    b.Property<string>("CtrExec")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<DateTime>("DEndFactTre");

                    b.Property<DateTime>("DEndFactTrs");

                    b.Property<DateTime>("DSert");

                    b.Property<DateTime>("DStFactTre");

                    b.Property<DateTime>("DStFactTrs");

                    b.Property<DateTime>("DStor");

                    b.Property<string>("DTNumber")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<DateTime>("DateCustoms");

                    b.Property<DateTime>("DateInFact");

                    b.Property<DateTime>("DateOutFact");

                    b.Property<decimal>("Perc");

                    b.Property<string>("PersonBeginTO")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("PersonCl")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("PersonEndTO")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("PersonSert")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("PersonStor")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("PersonTO")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("ProcName")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("StatusBeginTO")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("StatusEndTO")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("StatusSert")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("StatusStor")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("StatusTO")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<int>("SupplierId");

                    b.Property<int>("SupplierIntId");

                    b.Property<string>("TTNNumber")
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("ClientRequestId");

                    b.ToTable("ClientRequestReports");
                });

            modelBuilder.Entity("kpma_ext.Models.Contractor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("FullName")
                        .HasAnnotation("MaxLength", 500);

                    b.Property<string>("INN")
                        .HasAnnotation("MaxLength", 12);

                    b.Property<string>("KPP")
                        .HasAnnotation("MaxLength", 9);

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("OGRN")
                        .HasAnnotation("MaxLength", 15);

                    b.HasKey("Id");

                    b.ToTable("Contractor","contr");
                });

            modelBuilder.Entity("kpma_ext.Models.DataRestriction", b =>
                {
                    b.Property<int>("DepartmentId");

                    b.Property<int>("MetaObjectId");

                    b.Property<int>("ObjectId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("DepartmentId", "MetaObjectId", "ObjectId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("MetaObjectId");

                    b.ToTable("DataRestriction","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContractorId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("Id");

                    b.HasIndex("ContractorId");

                    b.ToTable("Department","contr");
                });

            modelBuilder.Entity("kpma_ext.Models.DocCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AuthorId");

                    b.Property<string>("Barcode")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<string>("Content1");

                    b.Property<string>("Content2");

                    b.Property<string>("Content3");

                    b.Property<string>("Content4");

                    b.Property<string>("Content5");

                    b.Property<int>("ContractorFromId");

                    b.Property<int>("ContractorToId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<int>("DepartmentFromId");

                    b.Property<int>("DepartmentToId");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("cast([Id] as nvarchar) + ' от ' + convert(nvarchar(10), [DocDate], 104)");

                    b.Property<DateTime>("DocDate");

                    b.Property<int>("DocNumber")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Id]");

                    b.Property<int>("DocumentStatusId");

                    b.Property<int>("DocumentTypeId");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("ContractorFromId");

                    b.HasIndex("ContractorToId");

                    b.HasIndex("DepartmentFromId");

                    b.HasIndex("DepartmentToId");

                    b.HasIndex("DocumentStatusId");

                    b.HasIndex("DocumentTypeId");

                    b.ToTable("DocCard","doc");
                });

            modelBuilder.Entity("kpma_ext.Models.DocCardProperty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<int>("DocumentGroupId");

                    b.Property<int?>("DocumentTypeId");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("Id");

                    b.HasIndex("DocumentGroupId");

                    b.HasIndex("DocumentTypeId");

                    b.HasIndex("DocumentGroupId", "DocumentTypeId")
                        .IsUnique();

                    b.ToTable("DocCardProperty","doc");
                });

            modelBuilder.Entity("kpma_ext.Models.DocCardPropertyField", b =>
                {
                    b.Property<int>("DocCardPropertyId");

                    b.Property<string>("FieldName")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<bool>("IsMandatory")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<bool>("IsShown")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(true);

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("DocCardPropertyId", "FieldName");

                    b.HasIndex("DocCardPropertyId");

                    b.ToTable("DocCardPropertyField","doc");
                });

            modelBuilder.Entity("kpma_ext.Models.DocumentGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("Id");

                    b.ToTable("DocumentGroup","core");
                });

            modelBuilder.Entity("kpma_ext.Models.DocumentStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Color")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<int>("DocumentTypeId");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<int>("OrderNumber");

                    b.Property<string>("Value")
                        .HasAnnotation("MaxLength", 100);

                    b.HasKey("Id");

                    b.HasIndex("DocumentTypeId");

                    b.HasIndex("Name", "DocumentTypeId")
                        .IsUnique();

                    b.ToTable("DocumentStatus","core");
                });

            modelBuilder.Entity("kpma_ext.Models.DocumentType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BarcodeTemplate")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<int>("DocumentGroupId");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("Id");

                    b.HasIndex("DocumentGroupId");

                    b.HasIndex("Name", "DocumentGroupId")
                        .IsUnique();

                    b.ToTable("DocumentType","core");
                });

            modelBuilder.Entity("kpma_ext.Models.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Command")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("Icon")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<bool>("IsGroup");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<bool>("OnRight");

                    b.Property<int?>("ParentId");

                    b.Property<int>("SortOrder");

                    b.Property<string>("Url")
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Menu","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.MetaObject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comment")
                        .HasAnnotation("MaxLength", 500);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.Property<int?>("ParentId");

                    b.Property<string>("SchemaName")
                        .HasAnnotation("MaxLength", 10);

                    b.Property<string>("TableName")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<int?>("TypeId");

                    b.Property<string>("Value")
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("TableName");

                    b.HasIndex("TypeId");

                    b.HasIndex("Name", "ParentId")
                        .IsUnique();

                    b.ToTable("MetaObject","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.ObjectIntegration", b =>
                {
                    b.Property<int>("MetaObjectId");

                    b.Property<int>("ObjectId");

                    b.Property<string>("SystemName")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<int>("SystemId");

                    b.HasKey("MetaObjectId", "ObjectId", "SystemName");

                    b.HasIndex("MetaObjectId");

                    b.ToTable("ObjectIntegration","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("Role","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.RoleMenu", b =>
                {
                    b.Property<int>("RoleId");

                    b.Property<int>("MenuId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("RoleId", "MenuId");

                    b.HasIndex("MenuId");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleMenu","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.RolePermition", b =>
                {
                    b.Property<int>("MetaObjectId");

                    b.Property<int>("RoleId");

                    b.Property<bool>("CanAdd");

                    b.Property<bool>("CanDelete");

                    b.Property<bool>("CanEdit");

                    b.Property<bool>("CanRead");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("MetaObjectId", "RoleId");

                    b.HasIndex("MetaObjectId");

                    b.HasIndex("RoleId");

                    b.ToTable("RolePermition","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[Name]");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 200);

                    b.HasKey("Id");

                    b.ToTable("Service","core");
                });

            modelBuilder.Entity("kpma_ext.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<int>("ContractorId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("DisplayName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("([Name] + ' (' + [Email] + ')')");

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 200);

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("ContractorId");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("User","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.UserDepartment", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("DepartmentId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.Property<string>("LastUpdatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("suser_sname()")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<DateTime>("LastUpdatedDate")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("sysdatetime()");

                    b.HasKey("UserId", "DepartmentId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("UserId");

                    b.ToTable("UserDepartment","contr");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaim","meta");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaim","meta");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<int>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UserLogin","meta");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRole","meta");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserToken","meta");
                });

            modelBuilder.Entity("kpma_ext.Models.Attachment", b =>
                {
                    b.HasOne("kpma_ext.Models.MetaObject", "MetaObject")
                        .WithMany()
                        .HasForeignKey("MetaObjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.Chat", b =>
                {
                    b.HasOne("kpma_ext.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.MetaObject", "MetaObject")
                        .WithMany()
                        .HasForeignKey("MetaObjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.DataRestriction", b =>
                {
                    b.HasOne("kpma_ext.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.MetaObject", "MetaObject")
                        .WithMany()
                        .HasForeignKey("MetaObjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.Department", b =>
                {
                    b.HasOne("kpma_ext.Models.Contractor", "Contractor")
                        .WithMany()
                        .HasForeignKey("ContractorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.DocCard", b =>
                {
                    b.HasOne("kpma_ext.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.Contractor", "ContractorFrom")
                        .WithMany()
                        .HasForeignKey("ContractorFromId");

                    b.HasOne("kpma_ext.Models.Contractor", "ContractorTo")
                        .WithMany()
                        .HasForeignKey("ContractorToId");

                    b.HasOne("kpma_ext.Models.Department", "DepartmentFrom")
                        .WithMany()
                        .HasForeignKey("DepartmentFromId");

                    b.HasOne("kpma_ext.Models.Department", "DepartmentTo")
                        .WithMany()
                        .HasForeignKey("DepartmentToId");

                    b.HasOne("kpma_ext.Models.DocumentStatus", "DocumentStatus")
                        .WithMany()
                        .HasForeignKey("DocumentStatusId");

                    b.HasOne("kpma_ext.Models.DocumentType", "DocumentType")
                        .WithMany()
                        .HasForeignKey("DocumentTypeId");
                });

            modelBuilder.Entity("kpma_ext.Models.DocCardProperty", b =>
                {
                    b.HasOne("kpma_ext.Models.DocumentGroup", "DocumentGroup")
                        .WithMany()
                        .HasForeignKey("DocumentGroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.DocumentType", "DocumentType")
                        .WithMany()
                        .HasForeignKey("DocumentTypeId");
                });

            modelBuilder.Entity("kpma_ext.Models.DocCardPropertyField", b =>
                {
                    b.HasOne("kpma_ext.Models.DocCardProperty", "DocCardProperty")
                        .WithMany()
                        .HasForeignKey("DocCardPropertyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.DocumentStatus", b =>
                {
                    b.HasOne("kpma_ext.Models.DocumentType", "DocumentType")
                        .WithMany()
                        .HasForeignKey("DocumentTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.DocumentType", b =>
                {
                    b.HasOne("kpma_ext.Models.DocumentGroup", "DocumentGroup")
                        .WithMany("Types")
                        .HasForeignKey("DocumentGroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.Menu", b =>
                {
                    b.HasOne("kpma_ext.Models.Menu", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("kpma_ext.Models.MetaObject", b =>
                {
                    b.HasOne("kpma_ext.Models.MetaObject", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.HasOne("kpma_ext.Models.MetaObject", "Type")
                        .WithMany("TypeCollection")
                        .HasForeignKey("TypeId");
                });

            modelBuilder.Entity("kpma_ext.Models.ObjectIntegration", b =>
                {
                    b.HasOne("kpma_ext.Models.MetaObject", "MetaObject")
                        .WithMany()
                        .HasForeignKey("MetaObjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.RoleMenu", b =>
                {
                    b.HasOne("kpma_ext.Models.Menu", "Menu")
                        .WithMany()
                        .HasForeignKey("MenuId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.RolePermition", b =>
                {
                    b.HasOne("kpma_ext.Models.MetaObject", "MetaObject")
                        .WithMany()
                        .HasForeignKey("MetaObjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("kpma_ext.Models.User", b =>
                {
                    b.HasOne("kpma_ext.Models.Contractor", "Contractor")
                        .WithMany()
                        .HasForeignKey("ContractorId");
                });

            modelBuilder.Entity("kpma_ext.Models.UserDepartment", b =>
                {
                    b.HasOne("kpma_ext.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("kpma_ext.Models.Role")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("kpma_ext.Models.User")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("kpma_ext.Models.User")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<int>", b =>
                {
                    b.HasOne("kpma_ext.Models.Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("kpma_ext.Models.User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
