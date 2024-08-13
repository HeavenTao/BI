import { extend } from "quasar";
import AbsoluteLayoutCmpObj from "./absoluteLayoutCmpObj";
export default class PageLayoutCmpObj extends AbsoluteLayoutCmpObj {
  showGrid;
  isDarkModel;

  constructor() {
    super();
    this.type = "PageLayoutCmp";
    this.showGrid = false;
    this.isDarkModel = false;
    this.backgroundStyle.color = "white";
  }

  getNotSaveProperties() {
    var notSave = super.getNotSaveProperties();
    notSave.push("showGrid");
    return notSave;
  }
}
