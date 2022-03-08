import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-wes",
  templateUrl: "./wes.component.html",
  styleUrls: ["./wes.component.css"],
})
export class WesComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
