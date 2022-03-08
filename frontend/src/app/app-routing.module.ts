import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./page/user/home/home.component";
import { UserComponent } from "./page/user/user.component";
import { AboutComponent } from "./page/user/about/about.component";
import { SolutionComponent } from "./page/user/solution/solution.component";
import { BusinessComponent } from "./page/user/business/business.component";
import { ReferenceComponent } from "./page/user/reference/reference.component";
import { AdminComponent } from "./page/admin/admin.component";
import { AdminMainComponent } from "./page/admin/admin-main/admin-main.component";
import { AdminReferenceEditComponent } from "./page/admin/admin-reference/admin-reference-edit/admin-reference-edit.component";
import { AdminReferenceComponent } from "./page/admin/admin-reference/admin-reference.component";
import { SupportComponent } from "./page/user/support/support.component";
import { AdminSupportComponent } from "./page/admin/admin-support/admin-support.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "about/:page", component: AboutComponent },
      { path: "solution/:page", component: SolutionComponent },
      { path: "business/:page", component: BusinessComponent },
      { path: "reference/:page", component: ReferenceComponent },
      { path: "reference/:page/:id", component: ReferenceComponent },
      { path: "reference", component: ReferenceComponent },
      { path: "support/:page", component: SupportComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "", component: AdminReferenceComponent },
      { path: "reference/:page/:id", component: AdminReferenceComponent },
      { path: "reference/:page", component: AdminReferenceComponent },
      { path: "reference", component: AdminReferenceComponent },
      { path: "support", component: AdminSupportComponent },
      { path: "support/:page", component: AdminSupportComponent },
      { path: "support/:page/:id", component: AdminSupportComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
