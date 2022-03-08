import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  images = [
    {
      title: 'First Slide',
      short: 'First Slide Short',
      src: 'https://picsum.photos/id/700/900/500',
    },
    {
      title: 'Second Slide',
      short: 'Second Slide Short',
      src: 'https://picsum.photos/id/1011/900/500',
    },
    {
      title: 'Third Slide',
      short: 'Third Slide Short',
      src: 'https://picsum.photos/id/984/900/500',
    },
  ];
  slides = [
    { image: 'https://picsum.photos/seed/picsum/1200/300' },
    { image: 'https://picsum.photos/seed/picsum/1200/300' },
    { image: 'https://picsum.photos/seed/picsum/1200/300' },
    { image: 'https://picsum.photos/seed/picsum/1200/300' },
    { image: 'https://picsum.photos/seed/picsum/1200/300' },
  ];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  constructor() {}

  ngOnInit() {}
  prevSlide() {
    this.carousel.prev();
  }

  nextSlide() {}

  stopSlider() {
    this.carousel.pause();
  }
}
