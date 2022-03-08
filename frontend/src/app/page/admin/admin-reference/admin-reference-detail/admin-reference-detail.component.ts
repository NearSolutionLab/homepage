import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Reference } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-admin-reference-detail",
  templateUrl: "./admin-reference-detail.component.html",
  styleUrls: ["./admin-reference-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AdminReferenceDetailComponent implements OnInit {
  refernce: Reference = new Reference();
  subscriptions: Array<any> = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        if (params["id"] && params["page"]==='detail')
        this.getReference(params["id"]);
      })
    );
  }

  async getReference(id: string) {
    const resp: any = await this.apiService.getReference(id);

    if (resp.status) {
      this.refernce = resp.result;
      this.refernce.imageUrl = `${this.apiService.imageServerUrl}/${this.refernce.image}`;
      this.refernce.tagList = this.refernce?.tags?.split(";");
    } else {
    }
  }


  ngOnInit(): void {}

  async deleteReference() {
    const resp: any = await this.apiService.deleteReference(this.refernce);

    if (resp.status) {
      this.pageMove("/admin/reference");
    }
  }

  editReference(page: string) {
    this.pageMove(`${page}/${this.refernce.id}`);
  }

  pageMove(page: string) {
    this.router.navigate([page]);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }

  }
}
