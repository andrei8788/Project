"use strict";
var ToDoListService = (function () {
    function ToDoListService(elementId) {
        this._idTask = elementId;
        this._baseUrl = 'https://repetitora.net/api/JS/Tasks';
    }
    ToDoListService.prototype._error = function () {
        console.log('error');
    };
    ToDoListService.prototype.get = function (callbackService, id) {
        $.ajax({
            url: this._baseUrl + "?page=1&widgetId=" + id + "&count=50",
            success: function (data) {
                callbackService(data);
                console.log(data);
            },
            error: this._error.bind(this)
        });
    };
    ToDoListService.prototype.create = function (titleTask, callbackCreate, id) {
        $.ajax({
            type: "POST",
            url: this._baseUrl,
            data: {
                widgetId: id,
                title: titleTask
            },
            dataType: 'json',
            success: function (data) {
                callbackCreate(data);
                console.log(data);
            },
            error: this._error.bind(this)
        });
    };
    ToDoListService.prototype.deleteTask = function (callbackdeleteTask, id) {
        $.ajax({
            type: 'DELETE',
            url: this._baseUrl + "?widgetId=" + id + "&taskId=" + this._idTask + "&count=50",
            success: function (data) {
                callbackdeleteTask();
                console.log(data);
            },
            error: this._error.bind(this)
        });
    };
    ToDoListService.prototype.update = function (callbackUpdate, titleTask, id, done) {
        $.ajax({
            type: 'PUT',
            url: this._baseUrl,
            data: {
                widgetId: id,
                taskId: this._idTask,
                title: titleTask,
                done: done
            },
            dataType: 'json',
            success: function (data) {
                callbackUpdate();
                console.log(data);
            },
            error: this._error.bind(this)
        });
    };
    return ToDoListService;
}());
