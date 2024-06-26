const columns = document.querySelectorAll('.column');

const addTask = (event) => {
    event.preventDefault();

    const currentForm = event.target; // current form element
    const value = currentForm.elements[0].value; // value written in form's input
    const parent = currentForm.parentElement; // parent of form i.e. li
    const task = createTask(value); // li to be added

    parent.insertBefore(task, currentForm); // adding new task before the form

    currentForm.reset(); // clearing form
};

const createTask = (value) => {
    const task = document.createElement('li');
    task.className = "mb-3";
    const taskSpan = document.createElement('span');
    taskSpan.className = "flex-1 whitespace-nowrap flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white";
    taskSpan.setAttribute("draggable", "true");
    const text = document.createTextNode(value);
    taskSpan.appendChild(text);
    task.appendChild(taskSpan);
    return task;
};

columns.forEach(column => {
    const form = column.querySelector('.todo-form');
    form.addEventListener('submit', addTask);
});