import ComponentObjBase from "./componentObjBase";

export default class LayoutComponentBase extends ComponentObjBase {
  childs;

  constructor() {
    super();
    this.childs = [];
    this.canDrop = true;
  }

  getNotSaveProperties() {
    var notSave = super.getNotSaveProperties();
    notSave.push("childs");
    return notSave;
  }
}
