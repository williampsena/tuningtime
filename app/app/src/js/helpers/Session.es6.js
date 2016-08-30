export class _SessionHelper {
  constructor(context){
    this.context = context;
  }
  
  create(key, value) {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }

    this.context.setItem(key, value);
  }

  remove(key) {
   this.context.setItem(key, undefined);
  }

  get(key) {
    var value;
    var valueAsJson = this.context.getItem(key);
    
    if (valueAsJson && valueAsJson !== 'undefined') {
      value = JSON.parse(valueAsJson);
    }

    return value;
  }
}

export var SessionHelper = new _SessionHelper(window.sessionStorage);
export var SessionLocalHelper = new _SessionHelper(window.localStorage);