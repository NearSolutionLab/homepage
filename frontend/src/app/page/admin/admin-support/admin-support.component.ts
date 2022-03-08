import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-support",
  templateUrl: "./admin-support.component.html",
  styleUrls: ["./admin-support.component.css"],
})
export class AdminSupportComponent implements OnInit {
  subscriptions: Array<any> = [];
  page: string;

  constructor(private route: ActivatedRoute) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.page = params["page"];
      })
    );
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
