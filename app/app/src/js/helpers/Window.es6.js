import electron from 'electron';

const window = electron.remote.getCurrentWindow();

export class _WindowHelper {
  restore(timeout) {
    timeout = timeout || 0;
    var timeoutMs = timeout * 1000;

    setTimeout(() => {
      window.restore();
    }, timeoutMs);
  }

  minimize(timeout) {
    timeout = timeout || 0;
    var timeoutMs = timeout * 1000;

    setTimeout(() => {
      window.minimize();
    }, timeoutMs);
  }
}

export var WindowHelper = new _WindowHelper();