import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-ptl-system",
  templateUrl: "./ptl-system.component.html",
  styleUrls: ["./ptl-system.component.css"],
})
export class PtlSystemComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
