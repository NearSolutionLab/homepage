import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Mail } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";
import { ToastService } from "src/app/service/toast.service";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-quote",
  templateUrl: "./quote.component.html",
  styleUrls: ["./quote.component.css"],
})
export class QuoteComponent implements OnInit {
  isFileUpload: boolean = true;
  mail: Mail = new Mail();
  contents: string;
  title: string;

  constructor(
    public apiService: ApiService,
    public utilService: UtilService,
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
        this.mail.files = resp.result;
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

  async sendQuote() {
    if (!this.isFileUpload) return 0;

    this.mail.title = this.title || "제목없음";
    this.mail.contents = this.contents || "내용없음";

    const resp: any = await this.apiService.sendQuote(this.mail);

    if (resp.status) {
      this.toast.add(
        "info",
        this.translate.instant("support.text.send-success")
      );
      this.initializeMailForm();
    }
  }

  initializeMailForm() {
    this.mail = new Mail();
    this.title = "";
    this.contents = "";
  }

  ngOnDestroy(): void {}
}
