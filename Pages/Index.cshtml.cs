using System.Collections.Generic;
using YesSql.ViewModels;

namespace YesSql.Pages
{
    public class IndexModel : BaseViewModel
    {
        public readonly IStore _store;
        public IEnumerable<Models.BrewDog.Recipie> Recipies;
        public IndexModel(IStore store)
        {
            _store = store;
        }
        public void OnGet()
        {
            using (var session = _store.CreateSession())
            {
                Recipies = session.Query<Models.BrewDog.Recipie>().ListAsync().Result;
            }
       }
    }
}