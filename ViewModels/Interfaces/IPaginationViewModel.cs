namespace YesSql.ViewModels.Interfaces
{
    public interface IPaginationViewModel
    {
        int PageNo { get; set; }
        int CurrentPage { get; }
        int Count { get; }
        int PageSize { get; set; }
        int TotalPages { get; }
        bool Eof { get; }
        bool Bof { get; }
        string PageName { get; }
        string PrevUrl { get; }
        string NextUrl { get; }
        string Tag { get; set; }
        string Title { get; set; }
    }
}
