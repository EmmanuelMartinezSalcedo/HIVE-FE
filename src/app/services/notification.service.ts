import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<string>('');
  private notificationContentSource = new BehaviorSubject<any>(null);
  notification$ = this.notificationSource.asObservable();
  notificationWithContent$ = this.notificationContentSource.asObservable();

  sendSearchNotification(message: string) {
    this.notificationSource.next(message);
  }

  sendCompleteNotification(message: string) {
    this.notificationSource.next(message);
  }

  sendResponseNotification(message: string, content: any) {
    this.notificationContentSource.next({ message, content });
  }
}
