<template>
  <div style="pointer-events: none" v-if="isShow" v-bind:style="style">
    <div :style="boundStyle"></div>
    <div v-bind:style="lStyle" v-on:mousedown="mousedown($event, 'l')"></div>
    <div v-bind:style="tStyle"></div>
    <div v-bind:style="rStyle"></div>
    <div v-bind:style="bStyle"></div>
    <div v-bind:style="ltStyle"></div>
    <div v-bind:style="rtStyle"></div>
    <div v-bind:style="rbStyle"></div>
    <div v-bind:style="lbStyle"></div>
  </div>
</template>
<script>
export default {
  name: "Controller",
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    w: {
      type: Number,
      default: 0,
    },
    h: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 0,
    },
    cmpObj: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      blockHeight: 8,
      blockWidth: 8,
      currentDir: null,
      blockDrag: false,
      inner_cmpObj: null,
      startStatus: null,
    };
  },
  watch: {
    cmpObj(nv) {
      this.inner_cmpObj = nv;
    },
  },
  computed: {
    boundStyle() {
      var layoutStyle = {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: this.w + "px",
        height: this.h + "px",
        border: "solid 2px red",
      };
      return layoutStyle;
    },
    style() {
      var layoutStyle = {
        position: "absolute",
        left: this.x + "px",
        top: this.y + "px",
        width: this.w + "px",
        height: this.h + "px",
        zIndex: this.zIndex,
      };

      return layoutStyle;
    },
    lStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = 0 - this.blockWidth / 2 + "px";
      basicStyle.top = this.h / 2 - this.blockHeight / 2 + "px";
      basicStyle.cursor = "ew-resize";
      return basicStyle;
    },
    tStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = this.w / 2 - this.blockWidth / 2 + "px";
      basicStyle.top = 0 - this.blockHeight / 2 + "px";
      basicStyle.cursor = "ns-resize";
      return basicStyle;
    },
    rStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = this.w - this.blockWidth / 2 + "px";
      basicStyle.top = this.h / 2 - this.blockHeight / 2 + "px";
      basicStyle.cursor = "ew-resize";
      return basicStyle;
    },
    bStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = this.w / 2 - this.blockWidth / 2 + "px";
      basicStyle.top = this.h - this.blockHeight / 2 + "px";
      basicStyle.cursor = "ns-resize";
      return basicStyle;
    },
    ltStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = 0 - this.blockWidth / 2 + "px";
      basicStyle.top = 0 - this.blockHeight / 2 + "px";
      basicStyle.cursor = "nwse-resize";
      return basicStyle;
    },
    rtStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = this.w - this.blockWidth / 2 + "px";
      basicStyle.top = 0 - this.blockHeight / 2 + "px";
      basicStyle.cursor = "nesw-resize";
      return basicStyle;
    },
    rbStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = this.w - this.blockWidth / 2 + "px";
      basicStyle.top = this.h - this.blockHeight / 2 + "px";
      basicStyle.cursor = "nwse-resize";
      return basicStyle;
    },
    lbStyle: function () {
      var basicStyle = this.getBasicBlockStyle();
      basicStyle.left = 0 - this.blockWidth / 2 + "px";
      basicStyle.top = this.h - this.blockHeight / 2 + "px";
      basicStyle.cursor = "nesw-resize";
      return basicStyle;
    },
  },
  methods: {
    mousedown(e, dir) {
      this.currentDir = dir;
      this.blockDrag = true;
      this.startStatus = {
        x: e.clientX,
        y: e.clientY,
        cmpX: this.inner_cmpObj.x,
        cmpY: this.inner_cmpObj.y,
        cmpW: this.inner_cmpObj.w,
        cmpH: this.inner_cmpObj.h,
      };

      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("mouseup", this.mouseup);
    },
    mousemove(e) {
      e.stopPropagation();
      if (this.blockDrag) {
        var endPoint = [e.clientX, e.clientY];
        var movementX = endPoint[0] - this.startStatus.x;
        var movementY = endPoint[1] - this.startStatus.y;
        for (var i = 0; i < this.currentDir.length; i++) {
          var s = this.currentDir[i];
          switch (s) {
            case "l":
              var x = this.startStatus.cmpX + movementX;
              console.log(e);
              if (
                x <
                this.startStatus.cmpX + this.startStatus.cmpW - this.blockWidth
              ) {
                this.inner_cmpObj.x = x;
                this.inner_cmpObj.w = this.startStatus.cmpW - movementX;
                this.$emit("update:x", this.inner_cmpObj.x);
                this.$emit("update:w", this.inner_cmpObj.w);
              }
              break;
            case "t":
              var y = this.y + e.movementY;
              if (y < this.y + this.h - this.blockHeight) {
              }
              break;
            case "r":
              var x = this.x + this.w + e.movementX;
              if (x > this.x + this.blockWidth) {
              }
              break;
            case "b":
              var y = this.y + this.h + e.movementY;
              if (y > this.y + this.blockHeight) {
              }
              break;
            case "m":
              var y = this.y + e.movementY;
              var x = this.x + e.movementX;
              break;
          }
        }
      }
    },
    mouseup() {
      this.blockDrag = false;
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mouteup", this.mouseup);
    },
    getBasicBlockStyle: function () {
      return {
        position: "absolute",
        width: this.blockWidth + "px",
        height: this.blockHeight + "px",
        background: "white",
        border: "solid 1px black",
        pointerEvents: "auto",
      };
    },
  },
};
</script>

<style></style>
