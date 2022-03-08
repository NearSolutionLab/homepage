import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-reference",
  templateUrl: "./admin-reference.component.html",
  styleUrls: ["./admin-reference.component.css"],
})
export class AdminReferenceComponent implements OnInit {
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
