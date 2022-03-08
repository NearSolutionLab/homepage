import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Reference } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";
import { ToastService } from "src/app/service/toast.service";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-admin-reference-edit",
  templateUrl: "./admin-reference-edit.component.html",
  styleUrls: ["./admin-reference-edit.component.css"],
})
export class AdminReferenceEditComponent implements OnInit {
  newTag: string = "";
  tagList: string[] = [];
  isFileUpload: boolean = false;
  refernce: Reference = new Reference();
  description: string;
  title: string;
  subscriptions: Array<any> = [];
  @ViewChild("editor") ckeditor: any;
  public editorReady: boolean;

  constructor(
    public apiService: ApiService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private translate: TranslateService
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        if (params["id"] && params["page"]==='edit') {
          this.getReference(params["id"]);
        }
      })
    );
  }

  async getReference(id: string) {
    const resp: any = await this.apiService.getReference(id);

    if (resp.status) {
      this.refernce = resp.result;
      this.title = this.refernce.title;
      this.description = this.refernce.description;
      this.tagList = this.refernce?.tags?.split(";") || [];
    } else {
    }
  }

  ngOnInit(): void {}
  fileUpload(e: any) {
    if (!e) return;
    const el = e.currentTarget;
    let files = e.target.files || e.dataTransfer.files;
    let files2 = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    let formData = new FormData();
    formData.append("file", files[0]);
    formData.append("fileId", this.utilService.randomUUID("file"));
    let xhr = new XMLHttpRequest();
    let vm = this;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const resp = JSON.parse(xhr.response);
        this.refernce.files = resp.result;
        this.isFileUpload = true;
      }
    };
    xhr.open("POST", `${this.apiService.restServiceUrl}/uploadTempFile`);
    xhr.send(formData);
    xhr.onload = () => {
      this.isFileUpload = true;
    };
    xhr.onerror = (err) => {
      console.log(err);
    };
  }

  addTag(ev: any) {
    if (ev.key === "Enter" && this.newTag) {
      this.tagList = [...this.tagList, this.newTag];
      this.newTag = "";
    }
  }
  deleteTag(index: number) {
    this.tagList = this.tagList.filter((tag, i) => index !== i);
  }

  async setReference() {
    if (!this.isFileUpload && !this.refernce.image) return;
    this.refernce.description = this.description;
    this.refernce.title = this.title;
    this.refernce.tags = this.tagList.join(";");

    const resp: any = await this.apiService.setReference(this.refernce);

    if (resp.status) {
      this.toast.add(
        "info",
        this.translate.instant("support.text.register-success")
      );
      this.router.navigate(["/admin/reference"]);
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
