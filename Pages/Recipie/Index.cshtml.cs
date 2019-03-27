using System.Net;
using System.Threading.Tasks;
using YesSql.ViewModels;

namespace YesSql.Pages.CompletedJob
{
    public class IndexModel : BaseViewModel
    {
        private readonly IStore _store;

        public Models.BrewDog.Recipie Recipie;
        
        public IndexModel(IStore store)
        {
            _store = store;
        }
        public async Task OnGetAsync(string serialNo)
        {
            using (var session = _store.CreateSession())
            {
                Recipie = await session.Query<Models.BrewDog.Recipie>().FirstOrDefaultAsync();
             //   await session.Query<Models.BrewDog.CompletedJob, CompletedJobBySerialNo>(x => x.SerialNo.Equals(serialNo)).FirstOrDefaultAsync();
            }

            if (Recipie == null)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
            }
        }
    }
}