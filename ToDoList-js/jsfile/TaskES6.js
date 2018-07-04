"use strict";
var Task = (function () {
    function Task(onDeleteCallback, widgetId, counterCallback) {
        this.counterCallback = counterCallback;
        this.widgetId = widgetId;
        this.title = '';
        this.id = '';
        this.isDone = false;
        this._elementLi = document.createElement('li');
        this.onDeleteCallback = onDeleteCallback;
        this._preloaderImg = document.createElement('img');
        this._divWrapperInputChangeTaskTitle = document.createElement('div');
        this._divWrapperInputChangeTaskTitle.className = 'form-group';
        this._inputChangeTaskTitle = document.createElement('input');
        this._inputChangeTaskTitle.className = 'form-control';
        this._divWrapperInputChangeTaskTitle.appendChild(this._inputChangeTaskTitle);
        this._preloaderImg.classList.add('loading');
        this._preloaderImg.src = 'images/loading.gif';
        this._preloaderImg2 = document.createElement('img');
        this._preloaderImg2.classList.add('preloaderfortask');
        this._preloaderImg2.src = 'images/create.gif';
    }
    ;
    Task.prototype.getElement = function () {
        this._elementLi.className = 'list-group-item';
        this._elementLi.innerHTML = "<div class=\"wrapper\">\n\t\t<input type=\"checkbox\" class=\"checked\" " + (this.isDone ? "checked" : "") + ">\n\t\t<label class=\"labelText\">" + this.title + "</label>\n\t\t<img class=\"delete\" src=\"images/delete.png\"></div>";
        var deleteButton = this._elementLi.querySelector('.delete');
        var service = new ToDoListService(this.id);
        deleteButton.addEventListener('click', this._onDeleteButtonClick(deleteButton, service));
        var inputTask = this._elementLi.querySelector('.checked');
        inputTask.addEventListener('change', this._onChangeInputTask(deleteButton, inputTask, service));
        var changeTitle = this._elementLi.querySelector('.labelText');
        changeTitle.addEventListener('dblclick', this.changeTaskTitle.bind(this));
        return this._elementLi;
    };
    ;
    Task.prototype._onDeleteButtonClick = function (deleteButton, service) {
        var _this = this;
        return function (e) {
            deleteButton.className = 'hide';
            _this._elementLi.appendChild(_this._preloaderImg);
            service.deleteTask(_this._onDeleteServiceTask(), _this.widgetId);
        };
    };
    Task.prototype._onDeleteServiceTask = function () {
        var _this = this;
        return function () {
            _this._elementLi.remove();
            _this.onDeleteCallback(_this);
        };
    };
    Task.prototype._onChangeInputTask = function (deleteButton, inputTask, service) {
        var _this = this;
        return function (e) {
            _this.isDone = inputTask.checked;
            _this.counterCallback(_this.isDone);
            deleteButton.className = 'hide';
            _this._elementLi.appendChild(_this._preloaderImg);
            service.update(_this._onUpdateServiceTask(deleteButton), _this.title, _this.widgetId, _this.isDone);
        };
    };
    Task.prototype._onUpdateServiceTask = function (deleteButton) {
        return function () {
            deleteButton.className = 'delete';
            $('.loading').remove();
        };
    };
    Task.prototype.changeTaskTitle = function () {
        var wrapper = this._elementLi.querySelector('.wrapper');
        wrapper.className = 'hide';
        this._elementLi.appendChild(this._divWrapperInputChangeTaskTitle);
        this._inputChangeTaskTitle.value = this.title;
        $('.loading').remove();
        this._inputChangeTaskTitle.addEventListener('keyup', this._onKeyupInputChangeTaskTitle(wrapper));
    };
    Task.prototype._onKeyupInputChangeTaskTitle = function (wrapper) {
        var _this = this;
        return function (e) {
            if (e.keyCode === 13) {
                if (_this._inputChangeTaskTitle.value.length > 30) {
                    alert("Не допустимое количество символов!!!Должно быть не больше 30!!!");
                }
                else {
                    _this._elementLi.querySelector('.labelText').innerHTML = _this._inputChangeTaskTitle.value;
                    _this.title = _this._inputChangeTaskTitle.value;
                    _this._divWrapperInputChangeTaskTitle.remove();
                    _this._elementLi.appendChild(_this._preloaderImg2);
                    var service = new ToDoListService(_this.id);
                    service.update(_this._onUpdateServiseTaskTitle(wrapper), _this.title, _this.widgetId, _this.isDone);
                }
            }
        };
    };
    Task.prototype._onUpdateServiseTaskTitle = function (wrapper) {
        var _this = this;
        return function () {
            _this._preloaderImg2.remove();
            wrapper.className = 'wrapper';
        };
    };
    Task.prototype.hide = function () {
        this._elementLi.className = 'hide';
    };
    ;
    Task.prototype.show = function () {
        this._elementLi.className = 'list-group-item';
    };
    ;
    return Task;
}());
;
