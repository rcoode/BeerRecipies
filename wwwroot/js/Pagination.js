/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference types="bootbox" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination() {
        var _this = _super.call(this) || this;
        _this.pageNo = 1;
        _this.getCustomParams = null;
        _this.$nextButton = $("#next-btn");
        _this.$prevButton = $("#previous-btn");
        _this.$searchButton = $("#search-btn");
        _this.$searchInput = $("#search-input");
        _this.$nextButton.attr("href", "javascript:void(0)").click(function () { return _this.nextPage(); });
        _this.$prevButton.attr("href", "javascript:void(0)").click(function () { return _this.previousPage(); });
        _this.$searchButton.prop("type", "button").click(function () { return _this.doSearch(); });
        _this.totalPages = $("#pagination-search-bar").data("total-pages");
        _this.$currentPageLabel = $("#current-page-label");
        _this.$totalPagesLabel = $("#total-pages-label");
        return _this;
    }
    Pagination.prototype.nextPage = function () {
        this.pageNo++;
        this.getPage();
    };
    Pagination.prototype.previousPage = function () {
        this.pageNo--;
        this.getPage();
    };
    Pagination.prototype.doSearch = function () {
        this.pageNo = 1;
        this.getPage();
    };
    Pagination.prototype.getPage = function () {
        var _this = this;
        var params = {};
        if (this.getCustomParams != null) {
            params = this.getCustomParams();
        }
        params.pageNo = this.pageNo;
        params.tag = this.$searchInput.val();
        this.callServer("RefreshPage", params, function (response) { return _this.renderPage(response); });
    };
    Pagination.prototype.renderPage = function (response) {
        $("#paged-list-container").html(response.page);
        this.configureNavigation(response);
    };
    Pagination.prototype.configureNavigation = function (response) {
        this.totalPages = response.totalPages;
        this.$currentPageLabel.val(this.pageNo);
        this.$totalPagesLabel.val(this.totalPages);
        this.$nextButton.removeClass("disabled active");
        this.$prevButton.removeClass("disabled active");
        this.$nextButton.addClass((this.pageNo < this.totalPages) ? "active" : "disabled");
        this.$prevButton.addClass((this.pageNo > 1) ? "active" : "disabled");
    };
    return Pagination;
}(Ajax));
//# sourceMappingURL=Pagination.js.map