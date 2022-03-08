import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Reference } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-reference-detail",
  templateUrl: "./reference-detail.component.html",
  styleUrls: ["./reference-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ReferenceDetailComponent implements OnInit {
  refernce: Reference = new Reference();
  subscriptions: Array<any> = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    public utilService: UtilService
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
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

  pageMove(page: string) {
    this.router.navigate([page]);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
