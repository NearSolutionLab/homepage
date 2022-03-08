import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-consulting",
  templateUrl: "./consulting.component.html",
  styleUrls: ["./consulting.component.css"],
})
export class ConsultingComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
}
