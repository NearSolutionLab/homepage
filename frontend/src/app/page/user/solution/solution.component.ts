import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-solution",
  templateUrl: "./solution.component.html",
  styleUrls: ["./solution.component.css"],
})
export class SolutionComponent implements OnInit {
  subscriptions: Array<any> = [];
  page: string;
  subPageList: string[] = [
    "nearView",
    "ptlSystem",
    "dynamicPut",
    "wes",
    "picking",
  ];
  constructor(private route: ActivatedRoute, public utileService: UtilService) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.page = params["page"];
        console.log(this.page);
      })
    );
  }
  ngOnInit(): void {}

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
