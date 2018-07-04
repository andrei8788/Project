declare var $: any;
class ToDoListService {
	private _idTask: string;
	private _baseUrl: string;
	constructor(elementId: string) {
		this._idTask = elementId;
		this._baseUrl = 'https://repetitora.net/api/JS/Tasks';
	}

	private _error() {
		console.log('error');
	}

	get(callbackService: Function, id: number) { //add list tasks
		$.ajax({
			url: `${this._baseUrl}?page=1&widgetId=${id}&count=50`,
			success: function (data) {
				callbackService(data);
				console.log(data);
			},
			error: this._error.bind(this)
		});
	}

	public create(titleTask: string, callbackCreate: Function, id: number) { // create new task
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
	}

	public deleteTask(callbackdeleteTask: Function, id: number) {
		$.ajax({
			type: 'DELETE',
			url: `${this._baseUrl}?widgetId=${id}&taskId=${this._idTask}&count=50`,
			success: function (data) {
				callbackdeleteTask();
				console.log(data);
			},
			error: this._error.bind(this)
		});
	}

	public update(callbackUpdate, titleTask, id, done) { // update task
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
	}
}