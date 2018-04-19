'use strict';
var App = function() {
};
var taskApp = new App();

App.prototype.idCounter = 0;
App.prototype.tasks = []; //All tasks stored here in order of priority, in sync with DOM.

App.prototype.addTask = function(taskName) { //Add new task.
    var task = new Task(taskName, "task"+(++this.idCounter));
    this.storeTask(task);
    return task;
};

App.prototype.storeTask = function(task) {
    this.tasks.push(task);
    //console.info(this.tasks); //For dev purpose, see what's in the task list.
};

App.prototype.changeTaskStatus = function(taskId, status) { //Change the task status between 'todo'/'done'.
    var i, tasks = this.tasks, totalTasks = tasks.length;
    for(i=0; i<totalTasks; i++) {
        if(tasks[i].id === taskId) {
            tasks[i].changeStatus(status);
        }
    }
};

App.prototype.deleteTask = function(taskId) {
    var i, tasks = this.tasks, totalTasks = tasks.length;
    for(i=0; i<totalTasks; i++) {
        if(tasks[i].id === taskId) {
            this.tasks.splice(i,1); //Remove task from the tasks list.
            return this.tasks.length;
        }
    }
};

App.prototype.prioritizeTask = function(taskId, priority) {
    for(var i=0;i<this.tasks.length;i++) {
        if(this.tasks[i].id === taskId) {
            if(priority === 'high' && i>0) { //Swap current task with task one above it.
                var temp = this.tasks[i];
                this.tasks[i] = this.tasks[i-1];
                this.tasks[i-1] = temp;
                return true;
            }
            else if(priority === 'low' && i<this.tasks.length-1) { //Swap current task with task one below it.
                var temp = this.tasks[i];
                this.tasks[i] = this.tasks[i+1];
                this.tasks[i+1] = temp;
                return true;
            }
        }
    }
}