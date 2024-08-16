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
  methods: {
    cmpEvtsEx() {
      let evts = {
        drop: this.onDrop,
      };

      return evts;
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.eventBus) {
        this.eventBus.emit("onDrop", { event: e, uid: this.uid });
      }
    },
  },
};
