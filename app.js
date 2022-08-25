//define UI variables
let list = document.querySelector('ul.collection');
let listItems = Array.from(list.children);
let clearBtn = document.querySelector('.clear-tasks');
let filter = document.querySelector('#filter');
let addTaskBtn = document.querySelector('.add-task');

//load all event listeners
loadEventListeners();

function loadEventListeners(){
    window.addEventListener('load', loadTasksFromLocalStorage);
    document.addEventListener('mouseover', clearBtnDisplayFunction);
    addTaskBtn.addEventListener('click', addTask);
    clearBtn.addEventListener('click', clearTasks);
    list.addEventListener('click', deleteTask);
    filter.addEventListener('keyup', filterTasks);
}




//filterTasks function
function filterTasks(e){
    if(filter.value.length === 0){
        listItems.forEach(element => {
            element.style.display = 'block';
        });
    }else{
        listItems.forEach(element => {
            if(element.textContent.toLocaleLowerCase().includes(filter.value.toLowerCase())){
                element.style.display = 'block';
            }else{
                element.style.display = 'none';
            }
      });
    }
}

//clearBtn display function
function clearBtnDisplayFunction(e){
    e.stopPropagation();
    e.preventDefault();

    let taskCard = document.querySelector('.card-action');

    if(listItems.length == 0) {
        taskCard.style.display = 'none';
        
    }else{
        taskCard.style.display = 'block';
        
    }
}

//clearBtn function
function clearTasks(e){
    e.preventDefault();
    list.innerHTML = '';
    listItems = [];
    localStorage.clear();
}

//addTask function
function addTask(e){
    e.preventDefault();
    
   let input = document.querySelector('#task-input');
   if(input.value != undefined && input.value != ''){

    createTask(input.value);
    saveToLocalStorage(input.value);

    input.value = '';
    
   }else{
    alert('Please add a task');
   }
   
}

//deleteTaskBtn function
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item') || e.target.classList.contains('delete-item')){
        let localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
        let taskTBD = e.target.parentElement.parentElement.textContent;
        if(localStorageTasks.includes(taskTBD)){
            localStorageTasks.splice(localStorageTasks.indexOf(taskTBD),1);
        }
        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

        e.target.parentElement.parentElement.remove();
        listItems = list.children;
    }
}
   


function createTask(taskTextContent){

    let task = document.createElement('li');
    task.className = 'collection-item';
    task.textContent = taskTextContent;

    //creating deleteBtn for task
    let deleteBtn = document.createElement('a');
    deleteBtn.className = 'delete-item secondary-content';
    deleteBtn.setAttribute('href', '#');
    deleteBtn.innerHTML = '<i class="fa fa-remove"></i>';


    //appending a task to the list & updating listItems
    task.appendChild(deleteBtn);
    list.appendChild(task);
    listItems = Array.from(listItems);
    listItems.push(task);

}

//load tasks from localstorage on pageload
function loadTasksFromLocalStorage(e){
    e.stopPropagation();
    if(localStorage.getItem('tasks') !== null){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(task => {
            createTask(task);
        })
    }
}

function saveToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



 
