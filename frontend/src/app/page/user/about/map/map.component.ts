import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/service/util.service";

declare var kakao: any;
const defaultAddress = {
  lat: 37.4139418,
  lng: 127.0878377,
  name: "경기도 성남시 수정구 달래내로46 (시흥동) 성남글로벌융합센터 A동 408호",
};

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  public place: string;
  public map: any;
  public ps: any;
  public makerImage: any;

  constructor(public utilService: UtilService) {}

  ngOnInit(): void {
    window.requestAnimationFrame(() => this.mapSetting());
  }

  mapSetting() {
    let mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(defaultAddress.lat, defaultAddress.lng), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    this.map = new kakao.maps.Map(mapContainer, mapOption);
    this.ps = new kakao.maps.services.Places();
    new kakao.maps.InfoWindow({ zIndex: 1 });
    const imageSrc = "https://www.billiai.com/imageserver/map-marker.png";
    const imageSize = new kakao.maps.Size(21, 29);
    const imageOption = { offset: new kakao.maps.Point(10, 35) };
    this.makerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    this.displayMarker(defaultAddress);
    // this.positionSetting();
  }

  displayMarker(place: any) {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
      map: this.map,
      position: new kakao.maps.LatLng(place.lat, place.lng),
      image: this.makerImage,
    });
    const content = `<div class="customoverlay" style="box-shadow: 0px 1px 2px #858; position:relative; bottom:45px; border-radius: 6px; float: left;">
    <a style="display: block;border-radius: 6px;overflow: hidden; background: var(--main-color) url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">
   <span class="title" style="display: block; text-align: center; background: #ffffff; margin-right: 35px; padding: 10px 15px; font-size: 14px; font-weight: bold;">${place.name}</span>
     </a>
   <i style="position: absolute;margin-left: -12px;left: 50%;bottom: -12px;width: 22px;height: 12px;background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png);"></i>
 </div>`;

    const customOverlay = new kakao.maps.CustomOverlay({
      map: this.map,
      position: new kakao.maps.LatLng(place.lat, place.lng),
      content: content,
      yAnchor: 1,
    });
  }
}
