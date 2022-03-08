import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-logitics-system",
  templateUrl: "./logitics-system.component.html",
  styleUrls: ["./logitics-system.component.css"],
})
export class LogiticsSystemComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
}
