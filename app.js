const columns = document.querySelectorAll('.trello-cards');
const cardsContainer = document.querySelector('.cards-container');
const btn = document.getElementById('addNew');
const btnDiv = document.getElementById('buttonDiv');
const cardInput = document.getElementById('cardInput');
let draggedElement = null

const addTask = (event) => {
    event.preventDefault();

    const currentForm = event.target;
    const value = currentForm.elements[0].value;
    if (value.trim().length === 0) return;
    const parent = currentForm.parentElement;
    const task = createTask(value);

    parent.insertBefore(task, currentForm);
    const h5Value = parent.children[0].innerText
    if(!Array.isArray(savedTask[h5Value])){
        savedTask[h5Value] = []
    }
    savedTask[h5Value].push(value)
    localStorage.setItem('savedTask', JSON.stringify(savedTask));

    currentForm.reset();
};

const createTask = (value) => {
    const task = document.createElement('li');
    task.className = "mb-3";
    const taskSpan = document.createElement('span');
    taskSpan.className = "task flex-1 whitespace-nowrap flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white";
    taskSpan.setAttribute("draggable", "true");
    const text = document.createTextNode(value);
    taskSpan.appendChild(text);
    task.appendChild(taskSpan);

    task.addEventListener('mousedown', (e) => {
        draggedElement = e.target;
    })

    return task;
};

const createNewCard = (title) => {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'trello-cards h-auto card w-full max-w-sm h-64 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto');

    const cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white');
    cardTitle.appendChild(document.createTextNode(title));
    cardDiv.appendChild(cardTitle);

    const cardUl = document.createElement('ul');
    cardUl.setAttribute('class', 'todo-list my-4 space-y-3');
    cardDiv.appendChild(cardUl);

    const cardLi = document.createElement('li');
    const cardForm = document.createElement('form');
    cardForm.setAttribute('class', 'trello-form');

    const formDiv = document.createElement('div');
    formDiv.setAttribute('class', 'relative mb-6');

    const svgContainer = document.createElement('div');
    svgContainer.setAttribute('class', 'absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'w-[20px] h-[20px] text-gray-800 dark:text-white');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('d', 'M5 12h14m-7 7V5');
    svg.appendChild(path);
    svgContainer.appendChild(svg);
    formDiv.appendChild(svgContainer);

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('id', 'cardInput');
    input.setAttribute('class', 'input-group bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500');
    input.placeholder = 'Add new';
    formDiv.appendChild(input);

    cardForm.appendChild(formDiv);
    cardLi.appendChild(cardForm);
    cardUl.appendChild(cardLi);

    cardsContainer.insertBefore(cardDiv, btnDiv);

    cardForm.addEventListener('submit', addTask);

    cardDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    cardDiv.addEventListener('dragleave', (e) => {
        e.preventDefault();
    })

    cardDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        const droppedElement = e.target;
        if(droppedElement.className.includes('trello-cards')){
            droppedElement.appendChild(draggedElement)
        }
        if(droppedElement.className.includes('task')){
            droppedElement.parentElement.appendChild(draggedElement);
        }
    })
}

btn.addEventListener('click', () => {
    const cardTitleInput = prompt("Enter Card Title")
    if (cardTitleInput) {
        createNewCard(cardTitleInput)
    }
});

columns.forEach(column => {
    const form = column.querySelector('.trello-form');
    if (form) {
        form.addEventListener('submit', addTask);
    }
});


let savedTask = JSON.parse(localStorage.getItem('savedTasks'))
if (!savedTask) {
    savedTask = {}
}