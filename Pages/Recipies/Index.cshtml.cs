using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YesSql;
using YesSql.Models.BrewDog;
using YesSql.Services.Interfaces;
using YesSql.ViewModels;

namespace YesSql.Pages.CompletedJobs
{
    public class IndexModel : PaginationViewModel<Models.BrewDog.Recipie>
    {
        private readonly IStore _store;
        private readonly IViewRenderService _viewRenderService;

        public IEnumerable<Models.BrewDog.Recipie> Recipies;
        
        public IndexModel(IStore store, IViewRenderService viewRenderService)
        {
            _store = store;
            _viewRenderService = viewRenderService;
        }
        public async Task OnGetAsync()
        {
            await LoadData();
        }

        public async Task<ActionResult> OnPostRefreshPageAsync()
        {
            await LoadData();
            var page = await _viewRenderService.RenderToStringAsync("/Pages/CompletedJobs/Page", DataPage);
            return new OkObjectResult(new { page, this.TotalPages });
        }

        private async Task LoadData()
        {
            using (var session = _store.CreateSession())
            {
                Recipies = await session.Query<Models.BrewDog.Recipie>().ListAsync();
            }

            if (string.IsNullOrEmpty(Tag) == false)
            {
                /*
                Recipies = Recipies.Where(u => u.make.Contains(Tag, System.StringComparison.OrdinalIgnoreCase) || 
                u.model.Contains(Tag, System.StringComparison.OrdinalIgnoreCase) ||
                u.registrationNo.Replace(" ", string.Empty).Equals(Tag.Replace(" ",string.Empty), System.StringComparison.OrdinalIgnoreCase) ||
                u.serialNo.Contains(Tag, System.StringComparison.OrdinalIgnoreCase)
                ).ToList();
                */
            }

            Data = Recipies.ToList();//.OrderBy(u => u.authorisationDate).ToList();
        }
    }
}