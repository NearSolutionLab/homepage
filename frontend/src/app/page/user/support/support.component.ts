import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.css"],
})
export class SupportComponent implements OnInit {
  subscriptions: Array<any> = [];
  page: string;
  subPageList: string[] = ["library", "quote"];
  constructor(private route: ActivatedRoute, public utilService: UtilService) {
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
