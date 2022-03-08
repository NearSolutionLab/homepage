import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-reference",
  templateUrl: "./reference.component.html",
  styleUrls: ["./reference.component.css"],
})
export class ReferenceComponent implements OnInit {
  subscriptions: Array<any> = [];
  page: string;
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
