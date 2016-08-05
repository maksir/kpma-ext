using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using kpma_ext.Data;
using kpma_ext.Models;
using Newtonsoft.Json.Serialization;

namespace kpma_ext
{
	public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddDbContext<AppDbContext>();

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
        public void Configure(IApplicationBuilder app)
        {
			app.UseIdentity();

			app.UseMvc();

			//app.UseSwaggerGen();
			app.UseSwagger();
			app.UseSwaggerUi();

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
