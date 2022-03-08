import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Attachment } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";
import { UtilService } from "src/app/service/util.service";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_PER_ITEM = 6;

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.css"],
})
export class LibraryComponent implements OnInit {
  page: string;
  toggleTag: boolean = false;
  _currentPage: number = 1;
  totalPage: Array<number> = [];
  keyWord: string;
  selectedAttachment: Attachment = new Attachment();
  attachmentList: Attachment[] = [];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public utilService: UtilService
  ) {}

  get currentPage() {
    return this._currentPage;
  }
  ngOnInit(): void {
    this.currentPage = DEFAULT_PAGE;
  }

  set currentPage(pageNum: number) {
    if (pageNum) {
      this.apiService
        .getAttachments(pageNum - 1, DEFAULT_PAGE_PER_ITEM)
        .then((resp: any) => {
          if (resp.status) {
            this.attachmentList = resp.result.attachment;
            this.attachmentList.forEach((att) => {
              att.download = `${this.apiService.downLowdUrl}/${att.filePath}/${att.fileName}`;
            });

            console.log(this.attachmentList);

            this.totalPage = this.utilService.makeListPage(
              resp.result.total,
              DEFAULT_PAGE_PER_ITEM
            );

            this._currentPage = pageNum;
          }
        });
    }
  }
}
