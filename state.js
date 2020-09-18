export default class State {
    currentPage;
    tableBody;
    usersAmount;
    amountPerPage;
    pagesQuantity;
    baseURL;
    constructor() {
        this.currentPage = 0;
        this.tableBody = document.getElementById('tbody');
        this.amountPerPage = 10;
        this.baseURL = 'https://utn-avanzanda2-tp5.herokuapp.com/api/User';
    }
}
