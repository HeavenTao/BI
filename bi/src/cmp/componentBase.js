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
    canDrag: {
      type: Boolean,
      default: false,
    },
    canDrop: {
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
    eventBus: {
      type: Object,
      default: null,
    },
    showDropState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      eventList: {},
    };
  },
  created() {
    this.eventList = this.cmpEvts();
  },
  computed: {
    positionStyle() {
      var layoutStyle = {
        position: this.position,
        left: this.x + "px",
        top: this.y + "px",
        width: this.w + "px",
        height: this.h + "px",
        zIndex: this.zIndex,
      };
      return layoutStyle;
    },
    designStyle() {
      var style = {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: this.w + "px",
        height: this.h + "px",
        pointerEvents: "none",
        border: "dashed 1px lightblue",
      };

      if (this.showDropState) {
        style.backgroundColor = this.canDrop ? "#c8e6c9" : "#ffcdd2c8";
      }

      return style;
    },
    style() {
      var layoutStyle = {
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
    cmpEvts() {
      var evts = {
        click: this.onClick,
      };
      extend(true, evts, this.cmpEvtsEx());
      return evts;
    },
    cmpEvtsEx() {
      return {};
    },
    onClick(e) {
      e.stopPropagation();
      if (this.eventBus) {
        this.eventBus.emit("active", { event: e, uid: this.uid });
      }
    },
  },
};
