import ComponentObjBase from "./componentObjBase";

export default class LayoutComponentObjBase extends ComponentObjBase {
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

  addChild(cmpObj) {
    if (!this.checkChildExists(cmpObj.uid)) {
      cmpObj.parent = this;
      cmpObj.parentUid = this.uid;
      cmpObj.eventBus = this.eventBus;
      this.childs.push(cmpObj);
      return true;
    }
    return false;
  }

  removeChild(uid) {
    let index = this.childs.findIndex((x) => x.uid == uid);
    if (index >= 0) {
      this.childs.splice(index, 1);
    }
  }

  checkChildExists(uid) {
    return this.childs.some((x) => {
      x.uid == uid;
    });
  }
}
