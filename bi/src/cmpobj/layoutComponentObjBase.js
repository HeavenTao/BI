import ComponentObjBase from "./componentObjBase";

export default class LayoutComponentBase extends ComponentObjBase {
  childs;
  canDrop;

  constructor() {
    super();
    this.childs = [];
    this.canDrop = false;
  }
}
