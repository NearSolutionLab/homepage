import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "ng2-ckeditor-12";

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./page/user/user.component";
import { AdminComponent } from "./page/admin/admin.component";
import { HomeComponent } from "./page/user/home/home.component";
import { NavbarComponent } from "./page/user/navbar/navbar.component";
import { FooterComponent } from "./page/user/footer/footer.component";
import { PublishService } from "./service/publish.service";
import { SpinnerService } from "./service/spinner.service";
import { AboutComponent } from "./page/user/about/about.component";
import { SelectBoxComponent } from "./directive/select-box/select-box.component";
import { MenuBarComponent } from "./directive/menu-bar/menu-bar.component";
import { SummaryComponent } from "./page/user/about/summary/summary.component";
import { PartnersComponent } from "./page/user/about/partners/partners.component";
import { VisionComponent } from "./page/user/about/vision/vision.component";
import { MapComponent } from "./page/user/about/map/map.component";
import { NearViewComponent } from "./page/user/solution/near-view/near-view.component";
import { HistoryComponent } from "./page/user/about/history/history.component";
import { SolutionComponent } from "./page/user/solution/solution.component";
import { PtlSystemComponent } from "./page/user/solution/ptl-system/ptl-system.component";
import { PickingComponent } from "./page/user/solution/picking/picking.component";
import { BusinessComponent } from "./page/user/business/business.component";
import { ConsultingComponent } from "./page/user/business/consulting/consulting.component";
import { OptimizationComponent } from "./page/user/business/optimization/optimization.component";
import { CarouselComponent } from "./page/user/home/carousel/carousel.component";
import { CarouselModule } from "primeng/carousel";
import { ReferenceComponent } from "./page/user/reference/reference.component";
import { FileUploadModule } from "ng2-file-upload";
import { UtilService } from "./service/util.service";
import { PaginationComponent } from "./directive/pagination/pagination.component";
import { DynamicPutComponent } from "./page/user/solution/dynamic-put/dynamic-put.component";
import { WesComponent } from "./page/user/solution/wes/wes.component";
import { LogiticsSystemComponent } from "./page/user/business/logitics-system/logitics-system.component";
import { AdminHeaderComponent } from "./page/admin/admin-header/admin-header.component";
import { AdminFooterComponent } from "./page/admin/admin-footer/admin-footer.component";
import { AdminMainComponent } from "./page/admin/admin-main/admin-main.component";
import { AdminReferenceComponent } from "./page/admin/admin-reference/admin-reference.component";
import { AdminReferenceEditComponent } from "./page/admin/admin-reference/admin-reference-edit/admin-reference-edit.component";
import { AdminReferenceDetailComponent } from "./page/admin/admin-reference/admin-reference-detail/admin-reference-detail.component";
import { AdminReferenceListComponent } from "./page/admin/admin-reference/admin-reference-list/admin-reference-list.component";
import { SupportComponent } from "./page/user/support/support.component";
import { LibraryComponent } from "./page/user/support/library/library.component";
import { QuoteComponent } from "./page/user/support/quote/quote.component";
import { AdminSupportComponent } from "./page/admin/admin-support/admin-support.component";
import { AdminSupportListComponent } from "./page/admin/admin-support/admin-support-list/admin-support-list.component";
import { AdminSupportEditComponent } from "./page/admin/admin-support/admin-support-edit/admin-support-edit.component";
import { ToastComponent } from "./directive/toast/toast.component";
import { ReferenceListComponent } from "./page/user/reference/reference-list/reference-list.component";
import { ReferenceDetailComponent } from "./page/user/reference/reference-detail/reference-detail.component";
import { SafePipe } from "./pipe/safe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    SelectBoxComponent,
    MenuBarComponent,
    SummaryComponent,
    PartnersComponent,
    VisionComponent,
    MapComponent,
    NearViewComponent,
    HistoryComponent,
    SolutionComponent,
    PtlSystemComponent,
    PickingComponent,
    BusinessComponent,
    ConsultingComponent,
    OptimizationComponent,
    CarouselComponent,
    ReferenceComponent,
    PaginationComponent,
    DynamicPutComponent,
    WesComponent,
    LogiticsSystemComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminMainComponent,
    AdminReferenceComponent,
    AdminReferenceEditComponent,
    AdminReferenceDetailComponent,
    AdminReferenceListComponent,
    SupportComponent,
    LibraryComponent,
    QuoteComponent,
    AdminSupportComponent,
    AdminSupportListComponent,
    AdminSupportEditComponent,
    ToastComponent,
    ReferenceListComponent,
    ReferenceDetailComponent,
    SafePipe,
  ],
  imports: [
    NgbModule,
    CKEditorModule,
    FileUploadModule,
    CarouselModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: "ko",
    }),
  ],
  providers: [PublishService, SpinnerService, UtilService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
