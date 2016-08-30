import Datastore from 'nedb';
import path from 'path';

export default class DatabaseHelper {
  static createDatabase(dbFile) {
    return new Datastore({ filename: path.resolve(`./db/${dbFile}.db`), autoload: true });
  }
}
