export interface ITaskFromServer {
  status: string;
  task: {
    done: boolean;
    id: string;
    title: string;
  };
}

export interface ITaskFromServerArray {
  done: boolean;
  id: string;
  title: string;
}

