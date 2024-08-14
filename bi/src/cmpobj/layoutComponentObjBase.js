import ComponentObjBase from "./componentObjBase";

export default class LayoutComponentBase extends ComponentObjBase {
  childs;
  canDrop;

  constructor() {
    super();
    this.childs = [];
    this.canDrop = false;
    this.draggable = false;
  }

  getNotSaveProperties() {
    var notSave = super.getNotSaveProperties();
    notSave.push("canDrop");
    notSave.push("childs");
    return notSave;
  }
}
