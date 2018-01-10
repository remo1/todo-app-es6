class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if(!this.tasks){
            this.tasks = [{
                task: 'task 1',
                isComplete: false
            },
            {
                task: 'task 2',
                isComplete: true
            },
            {
                task: 'task 3',
                isComplete: false
            }
        ];
        }
        this.loadTasks();
        this.addEventListeners();
    };
    loadTasks() {
        let tasksHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
        document.getElementById('taskList').innerHTML = tasksHtml;
    };
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox"  
                onchange="toDo.toggleTaskStatus(${index})" value="" class="" 
                ${task.isComplete?'checked':''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
                ${task.task}
            </div>
            <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i 
                id="deleteTask" data-id="${index}" class="delete-icon glyphicon 
                glyphicon-trash"></i></a>
                </div>
            </div>
            </li>
            `;
    };
    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    };
    deleteTask(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);
        this.loadTasks();
        console.log(event);
    };
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = '';
    };
    addTask(task) {
        let newTask = {
            task,
            isComplete: false
        };
        let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '') {
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            this.tasks.push(newTask);
            this.loadTasks();
        }
    };
    addEventListeners() {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = '';
            }
        });
    }

}

let toDo;
window.addEventListener('load', () => { // this will add an event litener to a browers. when browser will finish loading, load event is fired, which fires the function that initialize the ToDoClass and assigns is to toDo
    toDo = new ToDoClass();
})