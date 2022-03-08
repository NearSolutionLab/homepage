import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-partners",
  templateUrl: "./partners.component.html",
  styleUrls: ["./partners.component.css"],
})
export class PartnersComponent implements OnInit {
  images = [
    { src: "assets/image/customer-1.jpg" },
    { src: "assets/image/customer-2.jpg" },
    { src: "assets/image/customer-3.jpg" },
    { src: "assets/image/customer-4.jpg" },
    { src: "assets/image/customer-5.jpg" },
    { src: "assets/image/customer-6.jpg" },
    { src: "assets/image/customer-7.jpg" },
    { src: "assets/image/customer-8.jpg" },
    { src: "assets/image/customer-9.jpg" },
    { src: "assets/image/customer-10.jpg" },
    { src: "assets/image/customer-11.jpg" },
    { src: "assets/image/customer-12.jpg" },
    { src: "assets/image/customer-13.jpg" },
    { src: "assets/image/customer-14.jpg" },
    { src: "assets/image/customer-15.jpg" },
    { src: "assets/image/customer-16.jpg" },
    { src: "assets/image/customer-17.png" },
    { src: "assets/image/customer-18.png " },
  ];
  constructor(public utilService: UtilService) {}

  ngOnInit(): void {}
}
