import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-vision",
  templateUrl: "./vision.component.html",
  styleUrls: ["./vision.component.css"],
})
export class VisionComponent implements OnInit {
  constructor(public utilService:UtilService) {}

  ngOnInit(): void {}
  scrollTop() {
    window.scrollTo(0, 0);
  }
}
