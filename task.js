'use strict';
var Task = function(name, id) {
    this.name = name;
    this.id = id;
    this.status = 'todo';
}

Task.prototype.changeStatus = function(status) {
    this.status = status;
}