class ToDoListFiltr {
	private _div: HTMLDivElement;
	private _buttonAll: HTMLButtonElement;
	private _buttonActive: HTMLButtonElement;;
	private _buttonCompleted: HTMLButtonElement;
	divCounterTasks;
	callbackFiltr: Function;
	constructor(callbackFiltr: Function) {
		this._div = document.createElement('div');
		this.divCounterTasks = document.createElement('div');
		this._buttonAll = document.createElement('button');
		this._buttonActive = document.createElement('button');
		this._buttonCompleted = document.createElement('button');
		this.filtr();
		this.callbackFiltr = callbackFiltr;
	}

	public getButton(): HTMLDivElement {
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
	}

	public filtr(): void {
		this._buttonAll.addEventListener('click', (e) => {
			this.callbackFiltr(Values.All);
		});
		this._buttonActive.addEventListener('click', (e) => {
			this.callbackFiltr(Values.Active);
		});
		this._buttonCompleted.addEventListener('click', (e) => {
			this.callbackFiltr(Values.Completed);
		})
	}
}
enum Values { All, Active, Completed };

/*ToDoListFiltr.values = {
	all: "all",
	active: "active",
	completed: "completed"
}
*/


