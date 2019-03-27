using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using YesSql.Models.BrewDog;

namespace YesSql.Controllers
{
    public class BrewDogController : Controller
    {
        private readonly IStore _store;
        private readonly IHostingEnvironment _env;
        public BrewDogController(IStore store, IHostingEnvironment env)
        {
            _store = store;
            _env = env;
        }
        public IActionResult Index()
        {
            var filePath = System.IO.Path.Combine(_env.ContentRootPath, "data/beer_recipies.json");
            var recipiesJson = System.IO.File.ReadAllText(filePath);

            IEnumerable<Recipie> recipies = JsonConvert.DeserializeObject<IEnumerable<Recipie>>(recipiesJson);

            using (var session = _store.CreateSession())
            {
                foreach(Recipie recipie in recipies)
                {
                    session.Save(recipie);
                }
            }

            return Content("Loaded");
        }
    }
}