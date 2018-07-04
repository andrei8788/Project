"use strict";
var ToDoList = (function () {
    function ToDoList(elementId, title, widgetId) {
        this._valueDiv = 0;
        this.widgetId = widgetId;
        this.title = title;
        this.elementId = elementId;
        this._tasks = [];
        this._el = document.getElementById(elementId);
        this._filtrValue = Values.All;
        this._buttonFiltr = new ToDoListFiltr(this._onFiltrCallback());
        this.divElement = this._buttonFiltr.getButton();
        this._counterTasks = this.divElement.querySelector('.counter');
        this._service = new ToDoListService(elementId);
        this._service.get(this._onGetCallback(), this.widgetId);
        this._preloaderImg = document.createElement('img');
        this._preloaderImg.classList.add('preloader');
        this._preloaderImg.src = 'images/create.gif';
        this._div = document.createElement('div');
        this._div.classList.add('divblock');
    }
    ;
    ToDoList.prototype._onFiltrCallback = function () {
        var _this = this;
        return function (newValue) {
            _this._filtrValue = newValue;
            _this.renderTasks();
        };
    };
    ToDoList.prototype._onGetCallback = function () {
        var _this = this;
        return function (data) {
            _this._tasks = [];
            for (var i = 0; i < data.length; i++) {
                var task = _this.onGetAllTasks();
                task.title = data[i].title;
                task.id = data[i].id;
                task.isDone = data[i].done;
                !task.isDone ? _this._valueDiv++ : _this._valueDiv;
                _this._tasks.push(task);
                _this.renderTasks();
            }
        };
    };
    ToDoList.prototype.render = function () {
        this._el.innerHTML = "<div id=\"name\">" + this.title + "</div>\n\t\t<div class=\"form-group\">\n    \t\t<input type=\"text\" autofocus class=\"form-control createLists\" placeholder=\"What needs to be done?\">\n  \t\t</div>\n\t\t<ul data-role=\"tasksBlock\" class=\"list-group\"></ul>";
        var taskTitleEl = this._el.querySelector('.createLists');
        taskTitleEl.addEventListener('keypress', this._onKeyPressCallback(taskTitleEl));
    };
    ;
    ToDoList.prototype._onKeyPressCallback = function (taskTitleEl) {
        var _this = this;
        return function (e) {
            if (e.keyCode === 13) {
                if (taskTitleEl.value === "") {
                    alert("Введите данные...");
                }
                else if (taskTitleEl.value.length > 30) {
                    alert("Не допустимое количество символов!!!Должно быть не больше 30!!!");
                }
                else {
                    var task = _this.onGetAllTasks();
                    var taskBlock = _this._el.querySelector('[data-role="tasksBlock"]');
                    taskBlock.innerHTML = '';
                    task.title = taskTitleEl.value;
                    taskTitleEl.className = 'hide';
                    _this._el.insertBefore(_this._div, taskBlock);
                    _this._div.appendChild(_this._preloaderImg);
                    _this._service.create(task.title, _this._onCreateServiceCallback(task, taskTitleEl), _this.widgetId);
                }
            }
        };
    };
    ToDoList.prototype._onCreateServiceCallback = function (task, taskTitleEl) {
        var _this = this;
        return function (data) {
            task.id = data.task.id;
            task.isDone = data.task.done;
            task.title = data.task.title;
            _this._valueDiv++;
            _this._div.remove();
            taskTitleEl.classList.add('form-control', 'createLists', 'show');
            _this._tasks.push(task);
            _this.renderTasks();
        };
    };
    ToDoList.prototype.renderTasks = function () {
        var taskTitleEl = this._el.querySelector('.createLists');
        taskTitleEl.value = "";
        var taskBlock = this._el.querySelector('[data-role="tasksBlock"]');
        for (var i = 0; i < this._tasks.length; i++) {
            var task = this._tasks[i];
            taskBlock.appendChild(task.getElement());
            switch (this._filtrValue) {
                case Values.Active:
                    if (task.isDone) {
                        task.hide();
                    }
                    break;
                case Values.Completed:
                    if (!task.isDone) {
                        task.hide();
                    }
                    break;
                case Values.All:
                    task.show();
                    break;
            }
        }
        ;
        if (!!this._tasks.length) {
            taskBlock.appendChild(this.divElement);
            this._counterTasks.innerHTML = this._valueDiv + ' items left';
        }
    };
    ToDoList.prototype.onGetAllTasks = function () {
        var task = new Task(deleteTasksArray.bind(this), this.widgetId, countTasksChenge.bind(this));
        function deleteTasksArray(t) {
            this._tasks.splice(this._tasks.indexOf(t), 1);
            if (!t.isDone) {
                this._valueDiv--;
                this._counterTasks.innerHTML = this._valueDiv + ' items left';
            }
            if (this._tasks.length === 0) {
                this._buttonFiltr.getButton().remove();
            }
        }
        function countTasksChenge(isDone) {
            isDone ? this._valueDiv-- : this._valueDiv++;
            this._counterTasks.innerHTML = this._valueDiv + ' items left';
        }
        return task;
    };
    return ToDoList;
}());
