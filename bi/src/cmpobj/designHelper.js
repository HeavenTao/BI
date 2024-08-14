import Common from "src/utils/common";
import mitt from "mitt";
export default {
  innerEventBus: mitt(),
  outterEventBus: mitt(),
  cmpObjTree: null,
  activeCmp: null,
  loadConfig(config) {
    if (config) {
      this.initEmptyTree();
      this.cmpObjTree.load(config);
    } else {
      this.initEmptyTree();
    }
    this.outterEventBus.emit("cmpObjTreeChanged", this.cmpObjTree);
  },
  saveConfig() {
    return this.cmpObjTree.save();
  },
  initEmptyTree() {
    this.cmpObjTree = Common.createCmpObjByType("PageLayoutCmp");
    this.cmpObjTree.eventBus = this.innerEventBus;
    this.innerEventBus.on("active", (e) => {
      this.onActive(e);
    });
    this.innerEventBus.on("onDrop", (e) => {
      this.onDrop(e);
    });
  },
  onDrop({ event, uid }) {
    const dragInfo = this.unPackDragMsg(event);
    let config = dragInfo.config;
    let cmpObj = this.createCmpObjByType(config.type);
    cmpObj.load(config);
    cmpObj.x = event.offsetX - dragInfo.info.dragOffsetX;
    cmpObj.y = event.offsetY - dragInfo.info.dragOffsetY;
    this.addChild(uid, cmpObj);
  },
  onActive({ event, uid }) {
    let cmp = this.findCmpObjByUid(uid);
    if (cmp) {
      this.activeCmp = cmp;
      this.outterEventBus.emit("activeCmpChanged", this.activeCmp);
    }
  },
  createCmpObjByType(type) {
    return Common.createCmpObjByType(type);
  },
  cmpLibDragStart(node, e) {
    let item = this.createCmpObjByType(node.type);
    if (item == null) return;

    let data = {
      config: item.save(),
      info: {
        dragOffsetX: e.offsetX,
        dragOffsetY: e.offsetY,
        fromLayoutUid: 0,
      },
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  },
  addChild(parentUid, cmpObj) {
    let parent = this.findCmpObjByUid(parentUid);
    if (parent) {
      cmpObj.parent = parent;
      parent.childs.push(cmpObj);
    }
  },
  findCmpObjByUid(uid) {
    return this.findChildByUid([this.cmpObjTree], uid);
  },
  findChildByUid(tree, uid) {
    for (let node of tree) {
      if (node.uid === uid) {
        return node;
      } else if (node.childs && node.childs.length > 0) {
        const result = this.findChildByUid(node.childs, uid);
        if (result) {
          return result;
        }
      }
    }
    return null;
  },
  getCmpAbsolutePosition(cmp) {
    let position = {
      x: cmp.x,
      y: cmp.y,
    };
    if (cmp.parent) {
      let parentPosition = this.getCmpAbsolutePosition(cmp.parent);
      position.x += parentPosition.x;
      position.y += parentPosition.y;
    }
    return position;
  },
  unPackDragMsg: function (e) {
    let data = e.dataTransfer.getData("text/plain");
    if (!data) {
      return;
    }
    let dragInfo = JSON.parse(data);
    return dragInfo;
  },
};
