import Common from "src/utils/common";
import componentBase from "./componentBase";
export default {
  name: "layoutComponentBase",
  extends: componentBase,
  props: {
    childs: {
      type: Array,
      default: function () {
        return [];
      },
    },
    canDrop: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cmpEvtsEx() {
      return {
        drop: this.onDrop,
        dragstart: this.onDragStart,
        drag: this.onDrag,
        dragend: this.onDragEnd,
        dragover: this.onDragOver,
      };
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrag() {},
    onDragEnd() {},
    onDragStart() {},
    onDrop(e, params) {
      e.stopPropagation();
      const dragInfo = this.unPackDragMsg(e);
      var config = dragInfo.child;
      var cmpObj = Common.newCmpObj(config.type);
      cmpObj.load(config);
      cmpObj.x = e.offsetX - dragInfo.info.dragOffsetX;
      cmpObj.y = e.offsetY - dragInfo.info.dragOffsetY;
      cmpObj.eventBus = this.eventBus;
      cmpObj.parentUid = this.Uid;
      this.childs.push(cmpObj);
    },
    unPackDragMsg: function (e) {
      var data = e.dataTransfer.getData("text/plain");
      if (!data) {
        return;
      }
      var dragInfo = JSON.parse(data);
      return dragInfo;
    },
  },
};
