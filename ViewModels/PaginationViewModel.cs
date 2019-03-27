using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using YesSql.ViewModels.Interfaces;

namespace YesSql.ViewModels
{
    public class PaginationViewModel<T> : BaseViewModel, IPaginationViewModel
    {
        [BindProperty(SupportsGet = true)]
        public int PageNo { get; set; } = 1;
        public int CurrentPage => PageNo;
        public int Count => Data.Count;
        public int PageSize { get; set; } = 10;
        public int TotalPages => (int)Math.Ceiling(decimal.Divide(Count, PageSize));
        public bool Eof => CurrentPage >= TotalPages;
        public bool Bof => CurrentPage <= 1;
        public string PageName => RouteData.Values["page"]?.ToString();
        public string PrevUrl => NavigationUrl(CurrentPage - 1);
        public string NextUrl => NavigationUrl(CurrentPage + 1);
        [BindProperty(SupportsGet = true)]
        public string Tag { get; set; }
        public string Title { get; set; }
        private string NavigationUrl(int page)
        {
            return $"{PageName}?{nameof(PageNo)}={page}{TagParameter}";
        }
        private string TagParameter => string.IsNullOrEmpty(Tag) ? string.Empty : $"&{nameof(Tag)}={Tag}";

        public List<T> Data { get; set; }
        public List<T> DataPage => Data.Skip((PageNo - 1) * PageSize).Take(PageSize).ToList();
    }
}
