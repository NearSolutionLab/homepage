import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-near-view",
  templateUrl: "./near-view.component.html",
  styleUrls: ["./near-view.component.css"],
})
export class NearViewComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
