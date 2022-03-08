import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { getBusinessImage, getSolutionImage } from "src/app/model/repository";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isMobile: boolean;
  businessImages: any;
  solutionImages: any;
  partnersImages = ([] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ].map((n) => `/assets/image/customer-${n}.png`));
  private subscriptions: Array<any>;
  autoPlay: boolean = true;
  partnerScroll: number = 0;
  solutionScroll: number = 0;

  constructor(
    config: NgbCarouselConfig,
    private router: Router,
    private utilService: UtilService
  ) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.showNavigationArrows = false;
    this.isMobile = this.utilService.isMobile;
  }

  @ViewChild("myCarousel", { static: false }) myCarousel;
  @ViewChild("partner") partners;
  ngOnInit(): void {
    this.businessImages = getBusinessImage(this.isMobile);
    this.solutionImages = getSolutionImage(this.isMobile);
  }

  ngOnDestroy() {}

  next() {
    this.myCarousel.next();
  }
  prev() {
    this.myCarousel.prev();
  }
  toggle() {
    if (this.autoPlay) {
      this.autoPlay = false;
      this.myCarousel.pause();
    } else {
      this.autoPlay = true;
      this.myCarousel.cycle();
    }
  }
  partnerNext() {
    if (this.partnerScroll > 12) {
      this.partnerScroll = 0;
    } else {
      this.partnerScroll++;
    }
  }
  partnerPrev() {
    if (this.partnerScroll === 0) {
      this.partnerScroll = 13;
    } else {
      this.partnerScroll--;
    }
  }
  solutionNext() {
    if (this.solutionScroll === 2) {
      this.solutionScroll = 0;
    } else {
      this.solutionScroll++;
    }
  }
  solultionPrev() {
    if (this.solutionScroll === 0) {
      this.solutionScroll = 2;
    } else {
      this.solutionScroll--;
    }
  }
  pageMove(page: string) {
    window.scrollTo(0, 0);
    this.router.navigate([page]);
  }
}
