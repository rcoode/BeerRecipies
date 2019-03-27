using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;
using YesSql.Provider.Sqlite;
using YesSql.Services;
using YesSql.Services.Interfaces;

namespace YesSql
{
    public class Startup
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbProvider(config =>
                config.UseSqLite($"Data Source={Path.Combine(_hostingEnvironment.ContentRootPath, "Data/BrewDog.db")};")
            );

            services.AddTransient<IViewRenderService, ViewRenderService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // Map the typescript folder so it can be seen as virtual folder under the web site root (for debugging purposes)
                app.UseFileServer(new FileServerOptions()
                {
                    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Data")),
                    RequestPath = new PathString("/Data"),
                });
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseMvcWithDefaultRoute();
        }
    }
}
