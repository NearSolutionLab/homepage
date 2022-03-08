import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
  scrollTop() {
    window.scrollTo(0, 0);
  }
}
