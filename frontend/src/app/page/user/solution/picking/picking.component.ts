import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-picking",
  templateUrl: "./picking.component.html",
  styleUrls: ["./picking.component.css"],
})
export class PickingComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
  scrollTop() {
    window.scrollTo(0, 0);
  }
}
