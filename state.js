export default class State {
    currentPage;
    tableBody;
    usersAmount;
    amountPerPage;
    pagesQuantity;
    constructor() {
        this.currentPage = 0;
        this.tableBody = document.getElementById('tbody');
        this.amountPerPage = 10;
    }
}