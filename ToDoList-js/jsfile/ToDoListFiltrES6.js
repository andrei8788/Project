"use strict";
var ToDoListFiltr = (function () {
    function ToDoListFiltr(callbackFiltr) {
        this._div = document.createElement('div');
        this.divCounterTasks = document.createElement('div');
        this._buttonAll = document.createElement('button');
        this._buttonActive = document.createElement('button');
        this._buttonCompleted = document.createElement('button');
        this.filtr();
        this.callbackFiltr = callbackFiltr;
    }
    ;
    ToDoListFiltr.prototype.getButton = function () {
        this._div.classList.add('btn-group', 'btn-group-lg');
        this.divCounterTasks.className = 'counter';
        this._buttonAll.innerHTML = 'All';
        this._buttonAll.classList.add('buttonAll', 'btn');
        this._buttonActive.innerHTML = 'Active';
        this._buttonActive.classList.add('buttonActive', 'btn');
        this._buttonCompleted.innerHTML = 'Completed';
        this._buttonCompleted.classList.add('buttonCompleted', 'btn');
        this._div.appendChild(this.divCounterTasks);
        this._div.appendChild(this._buttonAll);
        this._div.appendChild(this._buttonActive);
        this._div.appendChild(this._buttonCompleted);
        return this._div;
    };
    ToDoListFiltr.prototype.filtr = function () {
        var _this = this;
        this._buttonAll.addEventListener('click', function (e) {
            _this.callbackFiltr(Values.All);
        });
        this._buttonActive.addEventListener('click', function (e) {
            _this.callbackFiltr(Values.Active);
        });
        this._buttonCompleted.addEventListener('click', function (e) {
            _this.callbackFiltr(Values.Completed);
        });
    };
    return ToDoListFiltr;
}());
var Values;
(function (Values) {
    Values[Values["All"] = 0] = "All";
    Values[Values["Active"] = 1] = "Active";
    Values[Values["Completed"] = 2] = "Completed";
})(Values || (Values = {}));
;
