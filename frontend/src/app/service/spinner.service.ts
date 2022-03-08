import { Injectable } from '@angular/core';

import { PublishService } from './publish.service';

@Injectable()
export class SpinnerService {
  public spinners: number = 0;
  constructor(private publishService: PublishService) {}

  add() {
    this.spinners++;
    if (this.spinners > 0) {
      setTimeout(() => {
        this.publishService.isLoading(true);
      });
    }
  }
  remove() {
    this.spinners--;
    if (this.spinners <= 0) {
      setTimeout(() => {
        this.publishService.isLoading(false);
      });
    }
  }

  clear() {
    this.spinners = 0;
    setTimeout(() => {
      this.publishService.isLoading(false);
    });
  }
}
