import AbsoluteLayoutCmpObj from "./absoluteLayoutCmpObj";
export default class PageLayoutCmpObj extends AbsoluteLayoutCmpObj {
  showGrid;
  isDarkModel;

  constructor(isDesign = true) {
    super();
    this.type = "PageLayoutCmp";
    this.showGrid = false;
    this.isDarkModel = false;
    this.backgroundStyle.color = "white";
    this.isDesign = isDesign;
    this.canDrag = false;
    this.canMove = false;
    this.canReSize = false;
  }

  getNotSaveProperties() {
    var notSave = super.getNotSaveProperties();
    notSave.push("showGrid");
    return notSave;
  }
}
