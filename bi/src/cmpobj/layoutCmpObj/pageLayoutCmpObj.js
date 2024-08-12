import AbsoluteLayoutCmpObj from "./absoluteLayoutCmpObj";
export default class PageLayoutCmpObj extends AbsoluteLayoutCmpObj {
  showGrid;
  isDarkModel;

  constructor() {
    super();
    this.showGrid = false;
    this.isDarkModel = false;
  }
}
