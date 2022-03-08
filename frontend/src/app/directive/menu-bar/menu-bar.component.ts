import { Component, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"],
})
export class MenuBarComponent implements OnInit {
  @Input() mainPage: string;
  @Input() subPageList: string[];
  @Input() subPage: string;

  constructor(private router: Router, public utilService: UtilService) {}

  movePage(page: string) {
    this.router.navigate([`/${this.mainPage}/${page}`]);
  }
  ngOnInit(): void {}
}
