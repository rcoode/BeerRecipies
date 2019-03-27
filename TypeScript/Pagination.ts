/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference types="bootbox" />

type GetParams = () => any;

class Pagination extends Ajax{
    $nextButton: JQuery<HTMLElement>;
    $prevButton: JQuery<HTMLElement>;
    $searchButton: JQuery<HTMLElement>;
    $searchInput: JQuery<HTMLElement>;
    $currentPageLabel: JQuery<HTMLElement>;
    $totalPagesLabel: JQuery<HTMLElement>;
    pageNo: number = 1;
    totalPages: number;
    public getCustomParams: GetParams = null;

    constructor() {
        super();
        this.$nextButton = $("#next-btn");
        this.$prevButton = $("#previous-btn");
        this.$searchButton = $("#search-btn");
        this.$searchInput = $("#search-input");

        this.$nextButton.attr("href", "javascript:void(0)").click(() => this.nextPage());
        this.$prevButton.attr("href", "javascript:void(0)").click(() => this.previousPage());
        this.$searchButton.prop("type", "button").click(() => this.doSearch());
        this.totalPages = $("#pagination-search-bar").data("total-pages");
        this.$currentPageLabel = $("#current-page-label");
        this.$totalPagesLabel = $("#total-pages-label");
    }

    private nextPage() {
        this.pageNo++;
        this.getPage();
    }

    private previousPage() {
        this.pageNo--;
        this.getPage();
    }

    private doSearch() {
        this.pageNo = 1;
        this.getPage();
    }

    public getPage() {
        let params: any = {};
        if (this.getCustomParams != null) {
            params = this.getCustomParams();
        }
        params.pageNo = this.pageNo;
        params.tag = this.$searchInput.val();
        this.callServer("RefreshPage", params, (response) => this.renderPage(response));
    }

    private renderPage(response: any) {
        $("#paged-list-container").html(response.page);
        this.configureNavigation(response);
    }

    private configureNavigation(response: any) {
        this.totalPages = response.totalPages;
        this.$currentPageLabel.val(this.pageNo);
        this.$totalPagesLabel.val(this.totalPages);
        this.$nextButton.removeClass("disabled active");
        this.$prevButton.removeClass("disabled active");
        this.$nextButton.addClass((this.pageNo < this.totalPages) ? "active" : "disabled");
        this.$prevButton.addClass((this.pageNo > 1) ? "active" : "disabled");
    }
}
