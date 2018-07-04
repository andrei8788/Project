class Task {
	private _preloaderImg2: HTMLImageElement;
	private _divWrapperInputChangeTaskTitle: HTMLDivElement;
	private _inputChangeTaskTitle: HTMLInputElement;
	private _elementLi: any;
	private _preloaderImg: HTMLImageElement;

	public title: string;
	public isDone: boolean;
	onDeleteCallback: Function;
	id: string;
	widgetId: number;
	counterCallback: Function;
	
	constructor(onDeleteCallback, widgetId, counterCallback) {
		this.counterCallback = counterCallback;
		this.widgetId = widgetId;
		this.title = '';
		this.id = '';
		this.isDone = false; // completed or failed task
		this._elementLi = document.createElement('li');
		this.onDeleteCallback = onDeleteCallback;
		this._preloaderImg = document.createElement('img')
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
	};

	public getElement(): HTMLLIElement {
		this._elementLi.className = 'list-group-item';
		this._elementLi.innerHTML = `<div class="wrapper">
		<input type="checkbox" class="checked" ${this.isDone ? "checked" : ""}>
		<label class="labelText">${this.title}</label>
		<img class="delete" src="images/delete.png"></div>`;
		const deleteButton = this._elementLi.querySelector('.delete');
		let service = new ToDoListService(this.id);
		
		deleteButton.addEventListener('click', this._onDeleteButtonClick(deleteButton, service));
		const inputTask = this._elementLi.querySelector('.checked');

		inputTask.addEventListener('change', this._onChangeInputTask(deleteButton, inputTask, service));

		const changeTitle = this._elementLi.querySelector('.labelText');
		changeTitle.addEventListener('dblclick', this.changeTaskTitle.bind(this))

		return this._elementLi;
	};

	private _onDeleteButtonClick(deleteButton, service) {
		return (e) => {
			deleteButton.className = 'hide';
			this._elementLi.appendChild(this._preloaderImg);
			service.deleteTask(this._onDeleteServiceTask(), this.widgetId);
		}
	}

	private _onDeleteServiceTask() {
		return () => {
			this._elementLi.remove();
			this.onDeleteCallback(this);
		}
	}

	private _onChangeInputTask(deleteButton, inputTask, service) {
		return (e) => {
			this.isDone = inputTask.checked;
			this.counterCallback(this.isDone);
			deleteButton.className = 'hide';
			this._elementLi.appendChild(this._preloaderImg);
			service.update(this._onUpdateServiceTask(deleteButton), this.title, this.widgetId, this.isDone);
		}
	}

	private _onUpdateServiceTask(deleteButton) {
		return () => { // request on update tasks                
			deleteButton.className = 'delete';
			$('.loading').remove();
		}
	}

	changeTaskTitle() {
		const wrapper = this._elementLi.querySelector('.wrapper');
		wrapper.className = 'hide';
		this._elementLi.appendChild(this._divWrapperInputChangeTaskTitle);
		this._inputChangeTaskTitle.value = this.title;
		$('.loading').remove();// while updating and editing the task, the preloader is removed
		this._inputChangeTaskTitle.addEventListener('keyup', this._onKeyupInputChangeTaskTitle(wrapper));
	}

	private _onKeyupInputChangeTaskTitle(wrapper) {
		return (e) => {
			if (e.keyCode === 13) {
				if (this._inputChangeTaskTitle.value.length > 30) {
					alert("Не допустимое количество символов!!!Должно быть не больше 30!!!");
				} else {
					this._elementLi.querySelector('.labelText').innerHTML = this._inputChangeTaskTitle.value;
					this.title = this._inputChangeTaskTitle.value;// assign new title
					this._divWrapperInputChangeTaskTitle.remove();
					this._elementLi.appendChild(this._preloaderImg2);
					let service = new ToDoListService(this.id);
					service.update(this._onUpdateServiseTaskTitle(wrapper), this.title, this.widgetId, this.isDone);
				}
			}
		}
	}

	private _onUpdateServiseTaskTitle(wrapper) {
		return () => {
			this._preloaderImg2.remove();
			wrapper.className = 'wrapper';
		}
	}

	public hide(): void {
		this._elementLi.className = 'hide';
	};

	public show(): void { // rename to show
		this._elementLi.className = 'list-group-item';
	};
};





