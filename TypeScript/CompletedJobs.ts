/// <reference types="jquery" />
/// <reference types="bootstrap" />
/// <reference types="bootbox" />

class CompletedJobs extends Pagination {
    $editUserModal: JQuery<HTMLElement>;

    constructor() {
        super();
    }
}

var completedJobs = new CompletedJobs();