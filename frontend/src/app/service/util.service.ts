import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class UtilService {
  public isMobile: boolean;
  constructor(public translate: TranslateService) {
    this.isMobile = this.detectMobileDevice(window.navigator.userAgent);
  }

  randomUUID(prefix) {
    const s = [],
      itoh = "0123456789abcdef";

    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (let i = 0; i < 36; i++) {
      s[i] = Math.floor(Math.random() * 0x10);
    }

    // Conform to RFC-4122, section 4.4
    s[14] = 4; // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8; // Specify 2 high bits of clock sequence

    // Convert to hex chars
    for (let i = 0; i < 36; i++) {
      s[i] = itoh[s[i]];
    }

    // Insert '-'s
    s[8] = s[13] = s[18] = s[23];

    return prefix + s.join("");
  }

  makeListPage(totalItems: number, pagePerItem): number[] {
    return Array(Math.ceil(totalItems / pagePerItem))
      .fill(1)
      .map((x, i) => i + 1);
  }

  detectMobileDevice(agent) {
    const mobileRegex = [
      /Android/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return mobileRegex.some((mobile) => agent.match(mobile));
  }
}
