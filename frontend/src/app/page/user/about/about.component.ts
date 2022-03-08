import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  subscriptions: Array<any> = [];
  page: string;
  subPageList: string[] = ["summary", "vision", "history", "partner", "map"];
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
