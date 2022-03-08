import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router, public utileService: UtilService) {}

  ngOnInit(): void {}

  movePage(page: string) {
    window.scrollTo(0, 0);
    this.router.navigate([page]);
  }
}
