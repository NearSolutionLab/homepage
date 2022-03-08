import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-business",
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"],
})
export class BusinessComponent implements OnInit {
  subscriptions: Array<any> = [];
  page: string;
  subPageList: string[] = ["logiticsSystem", "consulting", "optimization"];
  constructor(private route: ActivatedRoute, public utilService: UtilService) {
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
