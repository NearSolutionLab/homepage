import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-select-box",
  templateUrl: "./select-box.component.html",
  styleUrls: ["./select-box.component.css"],
})
export class SelectBoxComponent implements OnInit {
  @Input() selectedObject: any;
  @Input() keyId: string = "id";
  @Input() nameId: string = "name";
  @Input() page: string; // 'a' account, 'c'(work-list) or other
  @Output() selectedObjectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() refreshSelectObjects: EventEmitter<any> = new EventEmitter<any>();

  private _selectObjects: Array<any>;
  private _listObjects: Array<any>;
  private selectListBox: any;
  public focus: boolean = false;

  constructor(public translate: TranslateService) {}

  ngOnInit() {}
  get selectObjects() {
    return this._selectObjects;
  }
  @Input("selectObjects")
  set selectObjects(val) {
    this._selectObjects = val;
    if (this.selectObjects) {
      this.listObjects = this.selectObjects;
    }
  }

  setSelectListPosition() {
    if (!this.selectListBox) {
      return;
    }
    const selectList = this.selectListBox.querySelector("ul.select-list");
    if (selectList.length === 0) {
      setTimeout(() => {
        this.setSelectListPosition();
      }, 100);
      return;
    }
    const selectListBox = this.selectListBox;

    selectList.style.display = "block";
    selectList.style.top = selectListBox.offsetHeight + "px";
    selectList.style.left = -1 + "px";
  }
  get listObjects() {
    return this._listObjects;
  }
  set listObjects(val) {
    this._listObjects = val;
    if (this.listObjects && this.listObjects.length > 0) {
      setTimeout(() => {
        this.setSelectListPosition();
      });
      window.addEventListener("wheel", () => {
        this.listObjects = null;
        this.focus = false;
      });
    } else {
      window.removeEventListener("wheel", () => {});
    }
  }
  onFocusout(ev) {
    window.removeEventListener("wheel", () => {});
    window.requestAnimationFrame(() => {
      this.listObjects = null;
      this.focus = false;
    });
  }
  selectObject(ev, object) {
    ev.stopPropagation();
    this.selectedObject = object;
    this.selectedObjectChange.emit(object);
    window.requestAnimationFrame(() => {
      this.listObjects = null;
      this.focus = false;
    });
  }
  openListObjects(ev) {
    this.selectListBox = ev.currentTarget;
    this.selectListBox.focus();
    if (this.selectObjects && this.selectObjects.length > 0) {
      this.listObjects = this.selectObjects;
      this.focus = true;
    } else {
      this.listObjects = null;
      this.refreshSelectObjects.emit(ev);
    }
  }
}
