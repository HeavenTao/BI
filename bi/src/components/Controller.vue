<template>
  <div
    style="pointer-events: none; overflow: visible"
    v-if="isShow"
    v-bind:style="style"
  >
    <div :style="boundStyle"></div>
    <div
      v-bind:style="lStyle"
      v-on:mousedown="mousedown($event, 'l')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="tStyle"
      v-on:mousedown="mousedown($event, 't')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="rStyle"
      v-on:mousedown="mousedown($event, 'r')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="bStyle"
      v-on:mousedown="mousedown($event, 'b')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="ltStyle"
      v-on:mousedown="mousedown($event, 'lt')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="rtStyle"
      v-on:mousedown="mousedown($event, 'rt')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="rbStyle"
      v-on:mousedown="mousedown($event, 'rb')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="lbStyle"
      v-on:mousedown="mousedown($event, 'lb')"
      v-on:dragstart="onDragStart"
    ></div>
    <div
      v-bind:style="moveStyle"
      v-on:mousedown="mousedown($event, 'm')"
      v-on:dragstart="onDragStart"
    >
      <q-icon name="mdi-cursor-move" size="sm"></q-icon>
    </div>
  </div>
</template>
<script>
import { extend, debounce } from "quasar";
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
      blockHeight: 10,
      blockWidth: 10,
      moveBlockHeight: 20,
      moveBlockWidth: 20,
      currentDir: null,
      blockDrag: false,
      inner_cmpObj: null,
      cmpObjSnapShot: null,
      thisSnapShot: null,
      startPoint: null,
    };
  },
  created() {},
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
    moveStyle: function () {
      return {
        pointerEvents: "auto",
        position: "absolute",
        width: this.moveBlockWidth + "px",
        height: this.moveBlockHeight + "px",
        left: this.w / 2 - this.moveBlockWidth / 2 + "px",
        top: this.h / 2 - this.moveBlockHeight / 2 + "px",
      };
    },
  },
  methods: {
    onDragStart(e) {
      e.preventDefault();
    },
    mousedown(e, dir) {
      this.currentDir = dir;
      this.blockDrag = true;
      this.startPoint = [e.clientX, e.clientY];
      this.cmpObjSnapShot = extend(true, {}, this.inner_cmpObj);
      this.thisSnapShot = extend(true, {}, this.$props);

      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mouseup", this.mouseup);
      document.addEventListener("mouseup", this.mouseup);
      document.addEventListener("mousemove", this.mousemove);
    },
    mousemove(e) {
      e.preventDefault();
      e.stopPropagation();

      if (e.buttons === 1 && this.blockDrag) {
        var movementX = e.clientX - this.startPoint[0];
        var movementY = e.clientY - this.startPoint[1];
        for (var i = 0; i < this.currentDir.length; i++) {
          var s = this.currentDir[i];
          switch (s) {
            case "l":
              var x = this.cmpObjSnapShot.x + movementX;
              if (
                x <
                this.cmpObjSnapShot.x + this.cmpObjSnapShot.w - this.blockWidth
              ) {
                this.inner_cmpObj.x = x;
                this.inner_cmpObj.w = this.cmpObjSnapShot.w - movementX;
                this.$emit("update:x", this.thisSnapShot.x + movementX);
                this.$emit("update:w", this.thisSnapShot.w - movementX);
              }
              break;
            case "t":
              var y = this.cmpObjSnapShot.y + movementY;
              if (
                y <
                this.cmpObjSnapShot.y + this.cmpObjSnapShot.h - this.blockHeight
              ) {
                this.inner_cmpObj.y = y;
                this.inner_cmpObj.h = this.cmpObjSnapShot.h - movementY;
                this.$emit("update:y", this.thisSnapShot.y + movementY);
                this.$emit("update:h", this.thisSnapShot.h - movementY);
              }
              break;
            case "r":
              var x = this.cmpObjSnapShot.x + this.cmpObjSnapShot.w + movementX;
              if (x > this.cmpObjSnapShot.x + this.blockWidth) {
                this.inner_cmpObj.w = this.cmpObjSnapShot.w + movementX;
                this.$emit("update:w", this.thisSnapShot.w + movementX);
              }
              break;
            case "b":
              var y = this.cmpObjSnapShot.y + this.cmpObjSnapShot.h + movementY;
              if (y > this.cmpObjSnapShot.y + this.blockHeight) {
                this.inner_cmpObj.h = this.cmpObjSnapShot.h + movementY;
                this.$emit("update:h", this.thisSnapShot.h + movementY);
              }
              break;
            case "m":
              this.inner_cmpObj.x = this.cmpObjSnapShot.x + movementX;
              this.inner_cmpObj.y = this.cmpObjSnapShot.y + movementY;
              this.$emit("update:x", this.thisSnapShot.x + movementX);
              this.$emit("update:y", this.thisSnapShot.y + movementY);
              break;
          }
        }
      } else {
        console.log("Unvalid Move", e.buttons, this.blockDrag);
        this.blockDrag = false;
        document.removeEventListener("mousemove", this.mousemove);
        document.removeEventListener("mouseup", this.mouseup);
      }
    },
    mouseup() {
      console.log("mouseup");
      this.blockDrag = false;
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mouseup", this.mouseup);
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
