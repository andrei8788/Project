export class Task {
  isDone: boolean;
  id: string;
  title: string;
  constructor(title, isDone = false, id) {
    this.isDone = isDone;
    this.id = id;
    this.title = title;
  }
}
