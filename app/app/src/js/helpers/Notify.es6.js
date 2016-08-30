import { CurrentLanguage } from '../config/lang';

export class _NotifyHelper {

  notifyTimeOver(min) {
    this.notify(CurrentLanguage.alert.timeOver.title, CurrentLanguage.alert.timeOver.message.replace('{{min}}', min));
  }

  notifyStopped() {
    this.notify(CurrentLanguage.alert.stopped.title, CurrentLanguage.alert.stopped.message);
  }

  notifyStarted(min) {
    this.notify(CurrentLanguage.alert.started.title, CurrentLanguage.alert.started.message.replace('{{min}}', min))
  }

  notify(title, body) {
    new Notification(title, {
      body: body
    });
  }
}

export var NotifyHelper = new _NotifyHelper();