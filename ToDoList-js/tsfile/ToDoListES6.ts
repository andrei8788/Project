class ToDoList {
	private _preloaderImg: HTMLImageElement;
	private _div: HTMLDivElement;
	private _tasks: Task[];
	private _el: any;
	private _filtrValue: Values;
	private _buttonFiltr: ToDoListFiltr;
	private _service: ToDoListService;
	private _valueDiv: number;
	private _counterTasks: any;
	public title: string;
	
	widgetId: number;
	elementId: string;
	divElement: HTMLDivElement;

	constructor(elementId: string, title: string, widgetId: number) {
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
		this._service.get(this._onGetCallback(), this.widgetId) // request for getting tasks
		this._preloaderImg = document.createElement('img');
		this._preloaderImg.classList.add('preloader');
		this._preloaderImg.src = 'images/create.gif';
		this._div = document.createElement('div');
		this._div.classList.add('divblock');
	};

	private _onFiltrCallback() {
		return newValue => {
			this._filtrValue = newValue;
			this.renderTasks();
		}
	}

	private _onGetCallback() {
		return (data) => {
			this._tasks = [];
			for (let i = 0; i < data.length; i++) {
				let task = this.onGetAllTasks();
				task.title = data[i].title;
				task.id = data[i].id;
				task.isDone = data[i].done;
				!task.isDone ? this._valueDiv++ : this._valueDiv;
				this._tasks.push(task);
				this.renderTasks();
			}
		}
	}

	public render() {
		this._el.innerHTML = `<div id="name">${this.title}</div>
		<div class="form-group">
    		<input type="text" autofocus class="form-control createLists" placeholder="What needs to be done?">
  		</div>
		<ul data-role="tasksBlock" class="list-group"></ul>`;

		let taskTitleEl: HTMLInputElement = this._el.querySelector('.createLists');

		taskTitleEl.addEventListener('keypress', this._onKeyPressCallback(taskTitleEl));
	};

	private _onKeyPressCallback(taskTitleEl) {
		return (e) => {
			if (e.keyCode === 13) {
				if (taskTitleEl.value === "") {
					alert("Введите данные...");
				} else if (taskTitleEl.value.length > 30) {
					alert("Не допустимое количество символов!!!Должно быть не больше 30!!!");
				} else {
					let task: Task = this.onGetAllTasks();
					let taskBlock: HTMLDivElement = this._el.querySelector('[data-role="tasksBlock"]');
					taskBlock.innerHTML = '';
					task.title = taskTitleEl.value;

					taskTitleEl.className = 'hide'; // hide input for add tasks
					this._el.insertBefore(this._div, taskBlock);
					this._div.appendChild(this._preloaderImg); // add preloader
					this._service.create(task.title, this._onCreateServiceCallback(task, taskTitleEl), this.widgetId); //request create task
				}
			}
		}
	}

	private _onCreateServiceCallback(task, taskTitleEl) {
		return (data) => {
			task.id = data.task.id;
			task.isDone = data.task.done;
			task.title = data.task.title;
			this._valueDiv++;
			this._div.remove(); // delete preloader
			taskTitleEl.classList.add('form-control', 'createLists', 'show'); // show input
			this._tasks.push(task);
			this.renderTasks();
		}
	}

	private renderTasks(): void {
		let taskTitleEl: HTMLInputElement = this._el.querySelector('.createLists');
		taskTitleEl.value = "";
		let taskBlock: HTMLDivElement = this._el.querySelector('[data-role="tasksBlock"]');
		for (var i = 0; i < this._tasks.length; i++) {
			let task: Task = this._tasks[i];
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
		};
		if (!!this._tasks.length) {
			taskBlock.appendChild(this.divElement);
			this._counterTasks.innerHTML = this._valueDiv + ' items left';
		}
	}

	private onGetAllTasks(): Task {
		let task = new Task(deleteTasksArray.bind(this), this.widgetId, countTasksChenge.bind(this));

		function deleteTasksArray(t): void {
			this._tasks.splice(this._tasks.indexOf(t), 1); // in the 't' pass 'this' event of Task.js

			if (!t.isDone) {
				this._valueDiv--;
				this._counterTasks.innerHTML = this._valueDiv + ' items left';
			}
			if (this._tasks.length === 0) {
				this._buttonFiltr.getButton().remove();
			}
		}


		function countTasksChenge(isDone: boolean): void {
			isDone ? this._valueDiv-- : this._valueDiv++;
			this._counterTasks.innerHTML = this._valueDiv + ' items left';//счётчик вып. тасок
		}
		return task;
	}
}



