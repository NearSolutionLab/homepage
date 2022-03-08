import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Attachment } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";
import { ToastService } from "src/app/service/toast.service";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-admin-support-edit",
  templateUrl: "./admin-support-edit.component.html",
  styleUrls: ["./admin-support-edit.component.css"],
})
export class AdminSupportEditComponent implements OnInit {
  isFileUpload: boolean = false;
  attachment: Attachment = new Attachment();
  description: string;
  title: string;

  constructor(
    public apiService: ApiService,
    private utilService: UtilService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {}

  fileUpload(e: any) {
    if (!e) return;
    this.isFileUpload = false;
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
        this.attachment.files = resp.result;
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

  async uploadAttachment() {
    if (!this.isFileUpload) return 0;

    this.attachment.title = this.title || "제목없음";
    this.attachment.description = this.description || "내용없음";

    const resp: any = await this.apiService.setAttachment(this.attachment);

    if (resp.status) {
      this.toast.add(
        "info",
        this.translate.instant("support.text.register-success")
      );
      this.router.navigate(["/admin/support"]);
    }
  }
}
