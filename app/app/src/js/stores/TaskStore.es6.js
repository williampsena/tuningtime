import Q from 'q';
import { BaseStore } from './BaseStore';

export class TaskStore extends BaseStore {
  constructor(databases) {
    super(databases, 'task');
  }

  findByContent(name, completed, limit) {
    if(typeof completed !== "boolean"){
      completed = false;
    }
    
    var query = this.db
                  .where('name')
                  .startsWithIgnoreCase(name)
                  .filter(x => x.completed === completed);

    if(typeof limit == "number"){
      query = query.limit(limit);
    }
    
    return query.toArray().catch(err => {
      throw err;
    });
  }
}