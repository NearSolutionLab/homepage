import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isNavHover: boolean;
  listHover: boolean[] = [false, false, false, false, false];
  isMobile: boolean;
  header: any;
  onMenu: boolean = false;
  onListMenu: boolean[] = [false, false, false, false, false, false];
  menuIndex: number = -1;

  constructor(private router: Router, private utilService: UtilService) {
    this.isMobile = this.utilService.isMobile;
  }

  ngOnInit(): void {
    window.onload = () => {
      this.header = document.getElementById("header");
      if (!this.utilService.isMobile) {
        window.addEventListener("wheel", this.scrollHorizatal);
      }
    };
  }

  ngOnDestroy() {
    window.removeEventListener("wheel", this.scrollHorizatal);
  }

  scrollVertical = (e) => {
    if (this.header) {
      this.header.style.top = -window.pageYOffset + "px";
    }
  };

  scrollHorizatal = (e) => {
    if (this.header) {
      console.log(window.pageXOffset);
      this.header.style.left = -window.pageXOffset + "px";
    }
  };
  mouseHover() {
    if (!this.isNavHover) {
      this.isNavHover = true;
    }
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  mouseLeave() {
    if (this.isNavHover) this.isNavHover = false;
  }

  menuMouseIn(index: number) {
    this.listHover[index] = true;
  }
  menuMouseOut(index: number) {
    this.listHover[index] = false;
  }
  pageMove(page: string) {
    this.isNavHover = false;
    this.offMenu();
    window.requestAnimationFrame(() => {
      window.scroll(0, 0);
    });

    this.router.navigate([page]);
  }

  offMenu() {

    this.menuIndex = -1;
    this.onMenu = false;
  }
  toggleMenu() {
    if (!this.onMenu) {
      this.onMenu = true;
    } else {
      this.offMenu();
    }
  }

  selectListMenu(index: number) {
    if (index === this.menuIndex) {
      this.menuIndex = -1;
    } else {
      this.menuIndex = index;
    }
  }
}
