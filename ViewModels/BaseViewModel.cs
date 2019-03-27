using Microsoft.AspNetCore.Mvc.RazorPages;

namespace YesSql.ViewModels
{
    public class BaseViewModel : PageModel
    {
        public string CurrentUrl => HttpContext.Request.Path.Value;
    }
}
