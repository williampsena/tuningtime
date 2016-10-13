import Q from 'q';
import { BaseStore } from './BaseStore';

export class TaskLogStore extends BaseStore {
  constructor(databases) {
    super(databases, 'taskLog');
  }

  filterByDate(start, end) {
    return this.db.where('createAt').between(start, end).toArray();
  }

  updateTask(model) {
    return this.db.filter(x => x.task.id === model.id).modify({task: model});
  }
}