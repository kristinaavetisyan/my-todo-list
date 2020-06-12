let tasker = {
    construct: function() {
        this.selectElements();
        this.bindEvents();
        this.scantaskList();
    },
    selectElements: function() {
        this.taskInput = document.getElementById("input-task");
        this.taskList = document.getElementById("task-list");
        this.taskListChildren = this.taskList.children;
        this.addButton = document.getElementById("add-btn");
        this.errorMessage = document.getElementById("error");
    },
    buildTask: function () {
        let taskListItem, taskCheckbox, taskValue, taskButton, taskTrash;
        taskListItem = document.createElement("li");
        taskListItem.setAttribute("class", "task");

        taskCheckbox = document.createElement("input");
        taskCheckbox.setAttribute("type", "checkbox");
        taskCheckbox.className = "checkbox";

        taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = this.taskInput.value;
    
        taskValue = document.createTextNode(this.taskInput.value);
    
        taskButton = document.createElement("button");
        taskButton.className = "delete-button";

        taskTrash = document.createElement("i");
        taskTrash.setAttribute("class", "fas fa-trash-alt");

        taskButton.appendChild(taskTrash);

        taskListItem.appendChild(taskCheckbox);
        taskListItem.appendChild(taskText);
        taskListItem.appendChild(taskButton);

        this.taskList.appendChild(taskListItem);
    },

    error: function() {
        alert("Please add a task !")
    },

    addTask: function() {
        let taskValue = this.taskInput.value;
        this.errorMessage.style.display = "none";

        if(taskValue === ""){
            this.error();
        }else {
            this.buildTask();
            this.taskInput.value = "";
            this.scantaskList();
        }
    },

    enterKey: function(event) {
        if(event.keyCode === 13 || event.which === 13){
            this.addTask();
        }
    },

    bindEvents: function() {
        this.addButton.onclick = this.addTask.bind(this);
        this.taskInput.onkeypress = this.enterKey.bind(this);
    },

    scantaskList: function() {
        let taskListItem, checkBox, deleteButton;

        for(i = 0; i < this.taskListChildren.length; i++){
            taskListItem = this.taskListChildren[i];

            checkBox = taskListItem.getElementsByTagName("input")[0];
            deleteButton = taskListItem.getElementsByTagName("button")[0];

            checkBox.onclick = this.completeTask.bind(this, taskListItem, checkBox);
            deleteButton.onclick = this.deleteTask.bind(this, i);
        }
    },

    deleteTask: function(i) {
        this.taskListChildren[i].remove();
        this.scantaskList();
    },

    completeTask: function(taskListItem, checkBox) {
        if(checkBox.checked){
            taskListItem.className = "task-completed";
            taskText.className = "completed";
        }else {
            this.incompleteTask(taskListItem);
        }
    },

    incompleteTask: function(taskListItem) {
        taskListItem.className = "";
        taskText.className = "task-text";
    }
}