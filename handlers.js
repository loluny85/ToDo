(function() {
    'use strict';
    var todoTaskWrapper = document.getElementById('todowrapper'),
             addTaskBox = document.getElementById('addtask'),
               taskList = document.getElementById('tasklist'),
           taskCheckBox = document.getElementsByClassName('taskcheckbox');

    var markTaskBasedOnStatus = function(evt) {
        var currentTaskSelected = evt.target;
        var taskId = evt.target.parentNode.id;
        if(currentTaskSelected.checked === true) { //Mark task complete.
            evt.target.nextElementSibling.classList.add('marktaskcomplete');
            evt.target.parentNode.classList.add('taskcomplete');
            taskApp.changeTaskStatus(taskId,'done');
        }
        else {
            evt.target.nextElementSibling.classList.remove('marktaskcomplete'); //Un-mark task back to outstanding.
            evt.target.parentNode.classList.remove('taskcomplete');
            taskApp.changeTaskStatus(taskId,'todo');
        }
    }

    var deleteTaskItemFromDOM = function(evt) {
        var taskId = evt.target.parentNode.id;
        var totalTasks = taskApp.deleteTask(taskId);
        var taskItem = document.getElementById(taskId);
        taskItem.parentNode.removeChild(taskItem); //Delete task element from DOM.
        if(!totalTasks) {
            document.getElementById('taskstatusbars').classList.add('hide');
        }
    }

    var highlightStatusTab = function(evt) {
        var taskStatusButtons = Array.from(document.getElementsByClassName('taskstatus'));
        taskStatusButtons.forEach(function(element) {
            element.classList.remove('taskstatusactive');
        })
        evt.target.classList.add('taskstatusactive');
    }

    var showStatusSpecificTasks = function(taskStatus, taskId) {
        if(!taskStatus) {
            if(document.getElementById('showcompletedtasks').classList.contains('taskstatusactive')) {
                document.getElementById(taskId).classList.add('hide');
            }
            return;
        }
        var tasks = Array.from(document.getElementById('tasklist').children);
        tasks.forEach(function(element) {
            element.classList.remove('hide');
            if(taskStatus === 'showoutstandingtasks') {
                if(element.classList.contains('taskcomplete')) {
                    element.classList.add('hide');
                }
            }
            else if(taskStatus === 'showcompletedtasks') {
                if(!(element.classList.contains('taskcomplete'))) {
                    element.classList.add('hide');
                }
            }
        })
    }

    var prioritizeTask = function(evt) {
        if(evt.target.id === 'higherprioritizetask') {
            var hasTaskPriorityChanged = taskApp.prioritizeTask(evt.target.parentNode.id, 'high');
            if(hasTaskPriorityChanged) {
                swapTasksBasedOnPriority(evt, 'high');
            }
        }
        else {
            var hasTaskPriorityChanged = taskApp.prioritizeTask(evt.target.parentNode.id, 'low');
            if(hasTaskPriorityChanged) {
                swapTasksBasedOnPriority(evt, 'low');
            }
        }
    }

    var swapTasksBasedOnPriority = function(evt, priority) {
        var currentTaskId = evt.target.parentNode.id;
        var allSiblingNodes = evt.target.parentNode.parentNode.childNodes;
        for(var i=0;i<allSiblingNodes.length;i++) {
            if(allSiblingNodes[i].id === currentTaskId) {
                if(priority === 'high') { //swap current task with previous task in DOM
                    evt.target.parentNode.parentNode.insertBefore(allSiblingNodes[i], allSiblingNodes[i-1]);
                }
                else { //swap current task with next task in DOM
                    evt.target.parentNode.parentNode.insertBefore(allSiblingNodes[i+1], allSiblingNodes[i]);
                }
                break;
            }
        }
    }
    
    todoTaskWrapper.addEventListener('click', function(evt) {
        if(evt.target.className === 'taskcheckbox') { //If task checkbox is clicked.
            markTaskBasedOnStatus(evt);
        }
    
        else if(evt.target.className === 'taskDeleteButton') { //delete icon of a task is clicked.
            deleteTaskItemFromDOM(evt);
        }
    
        else if(evt.target.classList.contains('taskstatus')) { //Task status tabs is clicked.
            highlightStatusTab(evt);
            showStatusSpecificTasks(evt.target.id);
        }
    
        else if(evt.target.className === 'prioritizetask') { //Arrows of a task is clicked.
            prioritizeTask(evt);
        }
    });
    
    addTaskBox.addEventListener('keypress', function(evt) {
        if(evt.keyCode === 13 && addTaskBox.value) { //User presses enter in the text box to add a task.
            var taskObj = taskApp.addTask(addTaskBox.value);
            createTaskItem(taskObj);
            addTaskBox.value = '';
            showStatusSpecificTasks(null, taskObj.id);
            document.getElementById('taskstatusbars').classList.remove('hide');
        }
    });
    
    var createTaskItem = function(taskObj) { //Prepare the task element.
        var task = document.createElement('li'); //Task element.
        var cb = document.createElement('input'); //Checkbox in the task element.
        var taskLabel = document.createElement('span'); //Task name.
        var cross = document.createElement('span'); //Delete icon of the task element.
        var morePriority = document.createElement('span'); //Up arrow to prioritize task higher.
        var lessPriority = document.createElement('span'); //Down arrow to prioritize task lower.
        
        taskLabel.textContent = taskObj.name;
        taskLabel.className = "tasklabel";
        
        task.id = taskObj.id;
        task.className = "taskitem";
        
        cb.type="checkbox";
        cb.className = "taskcheckbox";
        cb.id = "cb_task";
    
        morePriority.innerHTML = "&#8593;";
        morePriority.id = 'higherprioritizetask';
        morePriority.className = 'prioritizetask';
    
        lessPriority.innerHTML = "&#8595;";
        lessPriority.id = 'lowerprioritizetask';
        lessPriority.className = 'prioritizetask';
    
        cross.innerHTML = "&#10005;";
        cross.className = 'taskDeleteButton';
        cross.id = "cross_task";
        
        task.insertBefore(taskLabel, task.firstChild);
        task.insertBefore(cb, task.firstChild);
        task.appendChild(morePriority);
        task.appendChild(lessPriority);
        task.appendChild(cross);
        taskList.appendChild(task);
    };
})()