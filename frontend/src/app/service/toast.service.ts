import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  public toasts = [];
  constructor() {}

  add(type, text) {
    this.toasts.push({
      type: type, // 'info', 'error', 'warn'
      text: text,
    });
    console.log(text);
  }

  clear() {
    this.toasts = [];
  }
}
