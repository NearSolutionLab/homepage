import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-dynamic-put",
  templateUrl: "./dynamic-put.component.html",
  styleUrls: ["./dynamic-put.component.css"],
})
export class DynamicPutComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
