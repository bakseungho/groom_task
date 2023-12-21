const list = document.querySelector('#list');
const addBtn = document.querySelector('#create-btn'); 
let lists = [];

addBtn.addEventListener('click', () => {
    createNewTodo();
});

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false,
    };

    lists.unshift(item); // 배열 첫번째 배치

    const {itemEl, inputEl} = createTodoElement(item); 

    list.prepend(itemEl); // 가장 위에 생성

    inputEl.removeAttribute('disabled');
    inputEl.focus();

    saveToLocalStorage();
};

// 엘리먼트 생성함수
function createTodoElement(item) {

    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const leftBox = document.createElement('div');
    leftBox.classList.add('left_box');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('edit-btn');
    editBtnEl.innerText = 'Edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('delete-btn');
    removeBtnEl.innerText = 'Delete';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;
        
        if(item.complete) {
            itemEl.classList.add('complete');
        }else{
            itemEl.classList.remove('complete')
        }
        saveToLocalStorage();
    });

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    });

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    });

    removeBtnEl.addEventListener('click', () => {
        lists = lists.filter(t => t.id !== item.id);

        itemEl.remove();
        saveToLocalStorage();
    });

    leftBox.append(checkboxEl);
    leftBox.append(inputEl);

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(leftBox);
    itemEl.append(actionsEl);

    return {itemEl, inputEl};
};


function saveToLocalStorage() {
    const data = JSON.stringify(lists);

    localStorage.setItem('my_todos', data);
};

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if(data) {
        lists = JSON.parse(data);
    }
}

function showTodos() {
    loadFromLocalStorage();

    for(let i = 0; i < lists.length; i++) {
        const item = lists[i];
        const { itemEl } = createTodoElement(item);

        list.append(itemEl);
    }
}

showTodos();