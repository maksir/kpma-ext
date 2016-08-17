using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using kpma_ext.Data;
using kpma_ext.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace kpma_ext
{
	public class Startup
    {
		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

			//if (env.IsDevelopment())
			//{
			//	// For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
			//	builder.AddUserSecrets();
			//}

			builder.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		public IConfigurationRoot Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
        {
			services.AddDbContext<AppDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddIdentity<User, Role>(
				config =>
				{
					config.Cookies.ApplicationCookie.LoginPath = "/user/login";
				})
				.AddEntityFrameworkStores<AppDbContext, int>()
				.AddDefaultTokenProviders();


			services.AddMvc().AddJsonOptions(options =>
			{
				options.SerializerSettings.DateFormatString = "dd.MM.yyyy HH:mm:ss";
				options.SerializerSettings.ContractResolver =
					new CamelCasePropertyNamesContractResolver();
			});

			services.AddSwaggerGen();
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			loggerFactory.AddDebug();

			app.UseIdentity();

			app.UseMvc();

			if (env.IsDevelopment())
			{
				//app.UseSwaggerGen();
				app.UseSwagger();
				app.UseSwaggerUi();
			}

			app.UseDefaultFiles();

			app.MapWhen(
				context =>
				{
					var path = context.Request.Path.Value.ToLower();
					return !path.Contains(".");
				},
				branch =>
				{
					branch.Use(
						(context, next) =>
						{
							context.Request.Path = new PathString("/index.html");
							return next();
						});
					branch.UseStaticFiles();
				}
			);

			app.UseStaticFiles();

		}
	}
}
