import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-optimization",
  templateUrl: "./optimization.component.html",
  styleUrls: ["./optimization.component.css"],
})
export class OptimizationComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
  scrollTop() {
    window.scrollTo(0, 0);
  }
}
