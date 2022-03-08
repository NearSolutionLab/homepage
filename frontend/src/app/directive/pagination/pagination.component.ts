import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  private _currentPage: number;
  @Input() totalPage: Array<number>;
  @Output() currentPageChange: EventEmitter<number> =
    new EventEmitter<number>();
  action: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  get currentPage() {
    return this._currentPage;
  }

  @Input("currentPage")
  set currentPage(val: number) {
    if (val) {
      this._currentPage = val;
    } else {
      this._currentPage = 1;
      this.currentPageChange.emit(1);
    }
  }

  selectPage(page: number) {
    if (page === this.currentPage) return;

    this.currentPage = page;
    this.currentPageChange.emit(this.currentPage);
  }
  onNextPage() {
    if (this.currentPage < this.totalPage.length) {
      this.currentPage++;
      this.currentPageChange.emit(this.currentPage);
    }
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.currentPageChange.emit(this.currentPage);
    }
  }
}
