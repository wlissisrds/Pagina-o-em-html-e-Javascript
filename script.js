const data = Array.from({ length: 100 }).map(
    (_, i) => `Item ${i+1}`);

//===========================================

let perPage = 5;
const state = {
    page: 1,
    perPage: perPage,
    //arredonda numer de pagina pra cima
    totalPages: Math.ceil(data.length / perPage),
}
//facilitar na seleçao de elementos html
const html = {
    get(element) {
        return document.querySelector(element)
    }
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

const list = {
    create(item) {
        console.log(item)
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = item;

        html.get('.list').appendChild(div);
    },
    update() {
        html.get('.list').innerHTML = ""

        let page = state.page - 1 // 1
        let start = page * state.perPage //1*5
        let end = start + state.perPage //5+5

        //SLICE corta o array   apartir da posição 2 até elementos  5 slice(2, 5)
        const paginatedItems =  data.slice(start, end);

        //criando item para cada elemendo do array de 5 
        paginatedItems.forEach(list.create)
    },
}

function update() {
    list.update();
}

function init() {
    list.update();
    controls.createListeners();
}

init();


