import Common from "src/utils/common";
import LayoutComponentObjBase from "./layoutComponentObjBase";
import mitt from "mitt";
export default {
  innerEventBus: mitt(),
  outterEventBus: mitt(),
  cmpObjTree: null,
  activeCmp: null,
  copyObj: null,
  dragInfo: null,
  activeParentQueue: [],
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
    this.cmpObjTree.isDesign = true;
    this.cmpObjTree.eventBus = this.innerEventBus;
    this.innerEventBus.on("active", (e) => {
      this.onActive(e);
    });
    this.innerEventBus.on("onDrop", (e) => {
      this.onDrop(e);
    });
    this.innerEventBus.on("activeParent", (e) => {
      this.onActiveParent(e);
    });
  },
  onActiveParent({ event, uid }) {
    if (this.activeParentQueue.length !== 0) {
      let lastUid = this.activeParentQueue[this.activeParentQueue.length - 1];
      let cmp = this.findCmpObjByUid(lastUid);
      if (cmp && cmp.parent) {
        this.activeParentQueue.push(cmp.parent.uid);

        this.activeCmp = cmp.parent;
        this.outterEventBus.emit("activeCmpChanged", this.activeCmp);
      }
    }
  },
  onDrop({ event, uid }) {
    const dragInfo = this.unPackDragMsg(event);
    let config = dragInfo.config;

    let currentParent = this.findCmpObjByUid(uid);
    let cmpObj = this.createCmpObjByType(config.type);
    cmpObj.eventBus = currentParent.eventBus;
    cmpObj.load(config);

    cmpObj.x = event.offsetX - dragInfo.info.dragOffsetX;
    cmpObj.y = event.offsetY - dragInfo.info.dragOffsetY;

    if (this.addChild(uid, cmpObj)) {
      let parentUid = config.parentUid;
      if (parentUid !== "") {
        let parent = this.findCmpObjByUid(parentUid);
        if (parent) {
          parent.removeChild(cmpObj.uid);
        }
      }

      this.activeCmp = cmpObj;
      this.outterEventBus.emit("activeCmpChanged", this.activeCmp);
    }
  },
  onActive({ event, uid }) {
    this.activeParentQueue = [uid];
    let cmp = this.findCmpObjByUid(uid);
    if (cmp) {
      this.activeCmp = cmp;
      this.outterEventBus.emit("activeCmpChanged", this.activeCmp);
    }
  },
  createCmpObjByType(type) {
    return Common.createCmpObjByType(type);
  },
  cmpDragStart({ event, uid }) {
    let cmp = this.findCmpObjByUid(uid);
    if (cmp) {
      this.dragInfo = {
        config: cmp.save(),
        info: {
          cmpUid: cmp.uid,
          parentUid: cmp.parentUid,
          dragOffsetX: event.offsetX,
          dragOffsetY: event.offsetY,
        },
      };

      //主动设置父级禁用，自身禁用，并记录状态
      cmp.parent.canDrop = false;
      cmp.canDrop = false;
      //自身如果是容器，自身内部的容器都要禁用
      if (cmp instanceof LayoutComponentObjBase) {
        let allChilds = [];
        this.findAllChildList(cmp, allChilds);
        allChilds.forEach((c) => {
          if (c instanceof LayoutComponentObjBase) {
            c.canDrop = false;
          }
        });
      }

      //显示canDrop状态
      this.setAllProperty([this.cmpObjTree], "showDropState", true);

      event.dataTransfer.setData("text/plain", JSON.stringify(this.dragInfo));
    }
  },
  cmpDragEnd({ event, uid }) {
    let cmp = this.findCmpObjByUid(this.dragInfo.info.cmpUid);
    let parent = this.findCmpObjByUid(this.dragInfo.info.parentUid);
    if (cmp instanceof LayoutComponentObjBase) {
      cmp.canDrop = true;

      let allChilds = [];
      this.findAllChildList(cmp, allChilds);
      allChilds.forEach((c) => {
        if (c instanceof LayoutComponentObjBase) {
          c.canDrop = true;
        }
      });
    }
    parent.canDrop = true;

    this.setAllProperty([this.cmpObjTree], "showDropState", false);
    this.dragInfo = null;
  },
  cmpLibDragStart(node, e) {
    let item = this.createCmpObjByType(node.type);
    if (item == null) return;

    let data = {
      config: item.save(),
      info: {
        dragOffsetX: e.offsetX,
        dragOffsetY: e.offsetY,
      },
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  },
  copy() {
    if (this.activeCmp) {
      this.copyObj = this.activeCmp;
    }
  },
  paste() {
    var config = this.copyObj.save();
    config.uid = Common.getUid();

    var cmp = Common.createCmpObjByType(config.type);
    cmp.load(config);
    cmp.x += 10;
    cmp.y += 10;
    if (this.addChild(this.copyObj.parent.uid, cmp)) {
      this.copyObj = cmp;
      this.activeCmp = cmp;
      this.outterEventBus.emit("activeCmpChanged", this.activeCmp);
    }
  },
  delActive() {
    if (this.activeCmp && this.activeCmp.parent) {
      var childs = this.activeCmp.parent.childs;
      var index = childs.indexOf(this.activeCmp);
      childs.splice(index, 1);
      this.activeCmp = null;
      this.outterEventBus.emit("activeCmpChanged", null);
    }
  },
  addChild(parentUid, cmpObj) {
    let parent = this.findCmpObjByUid(parentUid);
    if (parent) {
      return parent.addChild(cmpObj);
    }
    return false;
  },
  findCmpObjByUid(uid) {
    return this.findChildByUid([this.cmpObjTree], uid);
  },
  setAllProperty(tree, name, value) {
    for (let node of tree) {
      if (name in node) {
        node[name] = value;
      }

      if (node.childs && node.childs.length > 0) {
        const result = this.setAllProperty(node.childs, name, value);
      }
    }
    return null;
  },
  findAllChildList(cmp, childs) {
    if (cmp instanceof LayoutComponentObjBase) {
      cmp.childs.forEach((c) => {
        childs.push(c);
        this.findAllChildList(c, childs);
      });
    }
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
  getBoundingClientRect(cmp) {
    let el = document.getElementById(cmp.uid)
    let page = document.getElementById(this.cmpObjTree.uid)
    if (el && page) {
      let rect = el.getBoundingClientRect()
      let pageRect = page.getBoundingClientRect()
      return { x: rect.x - pageRect.x, y: rect.y - pageRect.y }
    }
    return null;
  },
  unPackDragMsg: function(e) {
    let data = e.dataTransfer.getData("text/plain");
    if (!data) {
      return;
    }
    let dragInfo = JSON.parse(data);
    return dragInfo;
  },
};
