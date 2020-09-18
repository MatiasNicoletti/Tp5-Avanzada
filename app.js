import State from './state.js';

const getUsersByPage = (currentPage) => {
    return new Promise((resolve, reject) => {
        let showQuantity = 10;
        let from = currentPage * showQuantity;
        let to = from + showQuantity;
        let url = `${state.baseURL}/${from}/${to}`;
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        }
        request.send();
    });
}

const createButtonsPages = async () => {
    const divPages = document.getElementById('pages');
    for (let i = 0; i < state.pagesQuantity; i++) {
        let btn = document.createElement('button');
        btn.innerHTML = i + 1;
        btn.setAttribute('data-page-number', i);
        btn.classList.add('btn-page');
        btn.id = i;
        divPages.appendChild(btn);
    }
}

const getTotal = () => {
    return new Promise((resolve, reject) => {
        let url = `${state.baseURL}/total`;
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        }
        request.send();
    });
}




const toggleActivePageBtn = () => {
    let btnACt = document.querySelector('.activate');
    let btn = document.querySelector(`[data-page-number="${state.currentPage}"]`);
    if (btnACt) {
        btnACt.classList.remove('activate');
    }
    btn.classList.add('activate');
}

const renderTable = (user, tbody) => {
    let tdataID = document.createElement('td');
    let tdataName = document.createElement('td');
    let tdataLast = document.createElement('td');
    tdataID.innerHTML = user.userId;
    tdataName.innerHTML = user.firstName;
    tdataLast.innerHTML = user.lastName;
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.appendChild(tdataID);
    tr.appendChild(tdataName);
    tr.appendChild(tdataLast);
}

const onPageButtonClicked = () => {
    const btns = document.querySelectorAll('.btn-page');
    btns.forEach(pageBtn => {
        pageBtn.addEventListener('click', async () => {
            fillTable(pageBtn);
        });
    })
}

const renderResult = async () => {
    const result = await getUsersByPage(state.currentPage);
    tbody.textContent = '';
    result.forEach(user => {
        renderTable(user, state.tableBody);
    });
}

const fillTable = async (pageBtn) => {
    state.currentPage = pageBtn.getAttribute('data-page-number');
    renderResult();
    toggleActivePageBtn();
}

const onArrowChangePage = async () => {
    const prevPage = document.getElementById('previous-page');
    const nextPage = document.getElementById('next-page');


    prevPage.addEventListener('click', async () => {
        if(state.currentPage>0){
            state.currentPage = state.currentPage - 1;
            renderResult();
            toggleActivePageBtn();
        }
        
    });
    nextPage.addEventListener('click', async () => {
        if(state.currentPage < state.pagesQuantity-1){
            state.currentPage = parseInt(state.currentPage) + parseInt(1);
            renderResult();
            toggleActivePageBtn();
        }
        
    });
}

let state;
window.onload = async () => {
    state = new State();
    state.usersAmount = await getTotal();
    state.pagesQuantity = state.usersAmount / state.amountPerPage;
    await createButtonsPages();
    await renderResult();
    await toggleActivePageBtn();
    await onPageButtonClicked();
    await onArrowChangePage();
}

