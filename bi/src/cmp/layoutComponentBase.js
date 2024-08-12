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
};
