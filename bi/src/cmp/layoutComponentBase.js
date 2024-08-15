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
  },
  watch: {
    canDrop() {
      this.canDropChanged();
    },
  },
  methods: {
    canDropChanged() {
      this.eventList = this.cmpEvts();
      console.log("canDropChanged", this.eventList, this.canDrop);
    },
    cmpEvtsEx() {
      let evts = {
        drop: this.onDrop,
        dragstart: this.onDragStart,
        drag: this.onDrag,
        dragend: this.onDragEnd,
      };

      if (this.canDrop) {
        evts["dragover"] = this.onDragOver;
      }

      return evts;
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrag() {},
    onDragEnd() {},
    onDragStart() {},
    onDrop(e) {
      e.stopPropagation();
      if (this.eventBus) {
        this.eventBus.emit("onDrop", { event: e, uid: this.uid });
      }
    },
  },
};
