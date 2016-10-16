import { BaseStore } from './BaseStore';

export class TaskLogStore extends BaseStore {
  constructor(databases) {
    super(databases, 'taskLog');
  }

  filterByDate(start, end) {
    return this.db.where('createAt').between(start, end).toArray();
  }

  updateTask(model) {
    return this.db.where('task.id').equals(model.id).modify(x => {
      x.task = model;
    });
  }
}