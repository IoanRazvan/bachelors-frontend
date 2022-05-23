import { Injectable } from "@angular/core";
import { Message } from "primeng/api";
import { first, ReplaySubject } from "rxjs";

export type NotificationType = "SUCCESS" | "ERROR";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notifications: ReplaySubject<any>;

    constructor() {
        this.notifications = new ReplaySubject(1);
    }

    addNotification(message: string, type: NotificationType, options ?: Partial<Message>) {
        this.notifications.next({message, type, options});
    }

    readOne(callback : any) {
        this.notifications.pipe(first()).subscribe(value => {
            if (value) {
                callback(value);
                this.notifications.next(null);
            }
        });
    }
}