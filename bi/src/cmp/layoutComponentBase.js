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
    onDrop(e) {
      e.stopPropagation();
      if (this.eventBus) {
        this.eventBus.emit("onDrop", { event: e, uid: this.uid });
      }
    },
  },
};
