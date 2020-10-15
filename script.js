function populateList() {
    const data = Array.from({ length: 100 }).map(
        (_, i) => `<div class="item"> Item ${i+1}</div>`);

    const list = document.querySelector('#paginate .list');

    //colocando item na div list obs: .join("") p/ tirar virgula
    list.innerHTML = data.join(""); 
    console.log(list);

    //para usar
    return data;

}

const data = populateList();
const html = {
    get(element) {
        return document.querySelector(element)
    }
}

let perPage = 5;
const state = {
    page: 1,
    perPage: perPage,
    //arredonda numer de pagina pra cima
    totalPages: Math.ceil(data.length / perPage),
}

const controls = {
    next() {
        state.page++;

        //calcula da ultima page
        const lastPage = state.page > state.totalPages;
        if(lastPage) {
            state.page--;
        }
    },
    prev() {
        state.page--;

        if(state.page < 1) {
            state.page++;
        }
    },
    goTo(page) {
        state.page = page;

        if(page < 1) {
            state.page = 1;
        }

        if(page > state.totalPages) {
            state.page = state.totalPages;
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1);
            update();
        }),

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPages);
            update();
        }),

        html.get('.next').addEventListener('click', () => {
            controls.next();
            update();
        }),

        html.get('.prev').addEventListener('click', () => {
            controls.prev();
            update();
        })
    }
}

controls.createListeners();

function update() {
    console.log(state.page);   
}



