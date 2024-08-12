import { extend } from "quasar";
import dockEnum from "src/enums/dockEnum";
export default {
  props: {
    uid: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    w: {
      type: Number,
      default: 100,
    },
    h: {
      type: Number,
      default: 100,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    dock: {
      type: Number,
      default: dockEnum.None.value,
    },
    anchor: {
      type: Array,
      default: function () {
        return [];
      },
    },
    zIndex: {
      type: Number,
      default: 0,
    },
    isDesign: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    lock: {
      type: Boolean,
      default: false,
    },
    borderStyle: {
      type: Object,
    },
    backgroundStyle: {
      type: Object,
    },
    position: {
      type: String,
      default: "absolute",
    },
  },
  computed: {
    style() {
      var layoutStyle = {
        position: this.position,
        left: this.x + "px",
        top: this.y + "px",
        width: this.w + "px",
        height: this.h + "px",
      };

      var backgroundStyle = this.getBackgroundStyle();

      var style = extend(true, {}, layoutStyle, backgroundStyle);

      return style;
    },
  },
  methods: {
    getBackgroundStyle() {
      var style = {};
      if (this.backgroundStyle) {
        if (this.backgroundStyle.image.url) {
        } else {
          style.backgroundColor = this.backgroundStyle.color;
        }
      }
      return style;
    },
  },
};
