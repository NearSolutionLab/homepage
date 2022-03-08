import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PublishService } from './service/publish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'near-solution';
  public appReady = false;
  public loadingCount: boolean = false;
  private subscriptions: Array<any> = [];

  constructor(
    private translate: TranslateService,
    private publishService: PublishService
  ) {
    translate.addLangs(['ko', 'en']);
    translate.setDefaultLang('ko');
    const browserLang = translate.getBrowserLang();
    translate
      .use(browserLang.match(/ko|en/) ? browserLang : 'ko')
      .subscribe(() => {
        // utilService.setSwLibTranslations();
        this.appReady = true;
      });
    this.subscriptions.push(
      this.publishService.subIsLoading.subscribe((loading) => {
        this.loadingCount = loading;
      })
    );
  }
  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
