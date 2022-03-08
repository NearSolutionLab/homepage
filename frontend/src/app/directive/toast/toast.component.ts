import { Component, OnInit } from "@angular/core";
import { ToastService } from "src/app/service/toast.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent implements OnInit {
  private toastsElement = null;

  constructor(public toastService: ToastService) {}

  ngOnInit() {
    this.toastsElement = document.querySelector("#toasts");
    const self = this;
    this.toastsElement.addEventListener("webkitAnimationEnd", function (e) {
      if (e.animationName === "hide") {
        self.toastService.toasts.splice(0, 1);
      }
    });
  }

  onClose(index) {
    if (index < this.toastService.toasts.length) {
      this.toastService.toasts.splice(index, 1);
    }
    return false;
  }
}
