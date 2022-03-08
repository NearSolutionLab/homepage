import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Reference, Tag } from "src/app/model/model";
import { ApiService } from "src/app/service/api.service";
import { UtilService } from "src/app/service/util.service";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_PER_ITEM = 9;

@Component({
  selector: "app-admin-reference-list",
  templateUrl: "./admin-reference-list.component.html",
  styleUrls: ["./admin-reference-list.component.css"],
})
export class AdminReferenceListComponent implements OnInit {
  _currentPage: number = 1;
  totalPage: Array<number> = [];
  keyWord: string = null;
  tagList: Tag[] = [];
  referenceList: Reference[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private utilService: UtilService
  ) {}
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(pageNum: number) {
    if (pageNum) {
      this.getReferences(pageNum);
    }
  }

  get selectedTags(): any {
    return this.tagList
      .filter((tag) => tag.selected)
      ?.map((tag) => tag.name)
      .join(",");
  }

  async getReferences(pageNum: number) {
    const resp: any = await this.apiService.getReferenceList(
      pageNum - 1,
      DEFAULT_PAGE_PER_ITEM,
      this.selectedTags,
      this.keyWord
    );

    if (resp.status) {
      this.referenceList = resp.result.reference;

      this.referenceList.forEach((ref) => {
        ref.tagList = ref.tags?.split(";");
        ref.imageUrl = `${this.apiService.imageServerUrl}/${ref.image}`;
      });
      console.log(this.referenceList);
      this.totalPage = this.utilService.makeListPage(
        resp.result.total,
        DEFAULT_PAGE_PER_ITEM
      );

      this._currentPage = pageNum;
    }
  }

  searchDataByKeyword(ev: any) {
    if ((ev?.key === "Enter" || ev?.type === "click") && this.keyWord) {
      this.getReferences(DEFAULT_PAGE);
    }
  }

  searchByTag(index: number) {
    this.tagList[index].selected = !this.tagList[index].selected;
    this.getReferences(DEFAULT_PAGE);
  }

  pageMove(page: string, id: string = "") {
    this.router.navigate([`/admin/reference/${page}/${id}`]);
  }
  ngOnInit(): void {
    this.getTags();
    this.currentPage = DEFAULT_PAGE;
  }

  async getTags() {
    const resp: any = await this.apiService.getTags();

    if (resp.status) {
      this.tagList = resp.result;
    } else {
    }
  }

  ngOnDestroy(): void {}
}
