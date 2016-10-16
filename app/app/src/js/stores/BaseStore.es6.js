export class BaseStore {
  constructor(db, dbContextName) {
    this.dbContext = db;
    this.db = db[dbContextName];
  }

  transaction() {
    return this.dbContext.transaction.apply(this, arguments);
  }

  count() {
    return this.db.count().catch(err => {
      throw err;
    });
  }

  first() {
    return this.db.toCollection().first().catch(err => {
      throw err;
    });
  }

  all() {
    return this.db.toCollection().toArray().catch(err => {
      throw err;
    });
  }

  get(id) {
    return this.db.filter(x => x.id === id).toArray().catch(err => {
      throw err;
    });
  }

  create(model) {
    delete model.id;

    return this.db.add(model).catch(err => {
      throw err;
    }).then(() => {
      return model;
    });
  }

  update(model) {
    var id = model.id;

    delete model.id;

    return this.db.update(id, model).catch(err => {
      throw err;
    }).then(() => {
      model.id = id;
      return model;
    });
  }

  remove(id) {
    return this.db.delete(id).catch(err => {
      throw err;
    });
  }

  removeAll() {
    return this.db.clear().catch(err => {
      throw err;
    });
  }
}