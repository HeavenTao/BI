<template>
  <div
    style="pointer-events: none; overflow: visible"
    v-if="isShow"
    v-bind:style="style"
  >
    <div :style="boundStyle"></div>
    <div
      v-show="canReSize"
      v-bind:style="lStyle"
      v-on:mousedown="mousedown($event, 'l')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="tStyle"
      v-on:mousedown="mousedown($event, 't')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="rStyle"
      v-on:mousedown="mousedown($event, 'r')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="bStyle"
      v-on:mousedown="mousedown($event, 'b')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="ltStyle"
      v-on:mousedown="mousedown($event, 'lt')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="rtStyle"
      v-on:mousedown="mousedown($event, 'rt')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="rbStyle"
      v-on:mousedown="mousedown($event, 'rb')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="lbStyle"
      v-on:mousedown="mousedown($event, 'lb')"
      v-on:dragstart="onDisableDragStart"
    ></div>
    <div
      v-show="canReSize"
      v-bind:style="moveStyle"
      v-on:mousedown="mousedown($event, 'm')"
      v-on:dragstart="onDisableDragStart"
    >
      <q-icon name="mdi-cursor-move" size="sm"></q-icon>
    </div>
    <div
      v-show="canMove"
      v-bind:style="moveStyle"
      v-on:mousedown="mousedown($event, 'm')"
      v-on:dragstart="onDisableDragStart"
    >
      <q-icon name="mdi-cursor-move" size="sm"></q-icon>
    </div>

    <div
      v-show="canDrag"
      v-bind:style="dragStyle"
      draggable="true"
      v-on:dragstart="onDragStart"
      v-on:dragend="onDragEnd"
    >
      <q-icon name="mdi-drag" size="sm"></q-icon>
    </div>
  </div>
</template>
<script>
import designHelper from "src/cmpobj/designHelper";
import { extend } from "quasar";
export default {
  name: "Controller",
  props: {
    cmpObj: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      isShow: false,
      blockHeight: 10,
      blockWidth: 10,
      moveBlockHeight: 24,
      moveBlockWidth: 24,
      currentDir: null,
      blockDrag: false,
      inner_cmpObj: null,
      cmpObjSnapShot: null,
      thisSnapShot: null,
      startPoint: null,
      canDrag: false,
      canMove: false,
      canReSize: false,
    };
  },
  created() {},
  watch: {
    cmpObj(nv) {
      this.cmpObjChanged(nv);
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
        border: "solid 2px lightblue",
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
    dragStyle() {
      return {
        pointerEvents: "auto",
        position: "absolute",
        width: this.moveBlockWidth + "px",
        height: this.moveBlockHeight + "px",
        left: this.w - this.moveBlockWidth + "px",
        top: 0 + "px",
        cursor: "grabbing",
      };
    },
    moveStyle: function () {
      return {
        cursor: "move",
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
    cmpObjChanged(nv) {
      if (nv) {
        this.inner_cmpObj = nv;
        this.canDrag = this.inner_cmpObj.canDrag;
        this.canMove = this.inner_cmpObj.canMove;
        this.canReSize = this.inner_cmpObj.canReSize;
        var position = designHelper.getCmpAbsolutePosition(this.inner_cmpObj);
        this.x = position.x;
        this.y = position.y;
        this.w = this.inner_cmpObj.w;
        this.h = this.inner_cmpObj.h;
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    onDisableDragStart(e) {
      e.preventDefault();
    },
    onDragStart(e) {
      designHelper.cmpDragStart({ event: e, uid: this.inner_cmpObj.uid });
    },
    onDragEnd(e) {
      designHelper.cmpDragEnd({ event: e, uid: this.inner_cmpObj.uid });
    },
    mousedown(e, dir) {
      this.currentDir = dir;
      this.blockDrag = true;
      this.startPoint = [e.clientX, e.clientY];
      this.cmpObjSnapShot = extend(true, {}, this.inner_cmpObj);
      this.thisSnapShot = extend(true, {}, this.$data);

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
                this.x = this.thisSnapShot.x + movementX;
                this.w = this.thisSnapShot.w - movementX;
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
                this.y = this.thisSnapShot.y + movementY;
                this.h = this.thisSnapShot.h - movementY;
              }
              break;
            case "r":
              var x = this.cmpObjSnapShot.x + this.cmpObjSnapShot.w + movementX;
              if (x > this.cmpObjSnapShot.x + this.blockWidth) {
                this.inner_cmpObj.w = this.cmpObjSnapShot.w + movementX;
                this.w = this.thisSnapShot.w + movementX;
              }
              break;
            case "b":
              var y = this.cmpObjSnapShot.y + this.cmpObjSnapShot.h + movementY;
              if (y > this.cmpObjSnapShot.y + this.blockHeight) {
                this.inner_cmpObj.h = this.cmpObjSnapShot.h + movementY;
                this.h = this.thisSnapShot.h + movementY;
              }
              break;
            case "m":
              this.inner_cmpObj.x = this.cmpObjSnapShot.x + movementX;
              this.inner_cmpObj.y = this.cmpObjSnapShot.y + movementY;
              this.x = this.thisSnapShot.x + movementX;
              this.y = this.thisSnapShot.y + movementY;
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
