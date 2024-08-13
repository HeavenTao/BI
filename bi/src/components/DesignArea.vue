<template>
  <div style="position: relative">
    <page-layout-cmp v-bind="pageObj"></page-layout-cmp>
    <controller v-bind.sync="controllerObj"></controller>
  </div>
</template>

<script>
import PageLayoutCmp from "src/cmp/layoutCmp/PageLayoutCmp.vue";
import Controller from "./Controller.vue";
import treeHelper from "src/utils/cmpObjTreeHelper";
export default {
  name: "DesignArea",
  components: { PageLayoutCmp, Controller },
  props: {
    pageObj: {
      type: Object,
      default: null,
    },
  },
  watch: {
    pageObj(nv) {
      this.pageObjChanged();
    },
  },
  data() {
    return {
      controllerObj: null,
    };
  },
  created() {
    this.controllerObj = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      isShow: false,
      zIndex: 0,
      cmpObj: null,
    };
  },
  methods: {
    pageObjChanged() {
      this.unregisterEvent();
      this.registerEvent();
    },
    getEvents() {
      return {
        active: this.active,
      };
    },
    registerEvent() {
      if (this.pageObj.eventBus) {
        const evts = this.getEvents();
        for (let e in evts) {
          this.pageObj.eventBus.on(e, evts[e]);
        }
      }
    },
    unregisterEvent() {
      if (this.pageObj.eventBus) {
        const evts = this.getEvents();
        for (let e in evts) {
          this.pageObj.eventBus.off(e, evts[e]);
        }
      }
    },
    active(event) {
      //TODO:ht先考虑单个激活
      let toFind = treeHelper.findChildByUid([this.pageObj], event.uid);
      let position = treeHelper.getCmpAbsolutePosition(toFind);
      this.controllerObj.x = position.x;
      this.controllerObj.y = position.y;
      this.controllerObj.w = toFind.w;
      this.controllerObj.h = toFind.h;
      this.controllerObj.isShow = true;
      this.controllerObj.zIndex = toFind.zIndex;
      this.controllerObj.cmpObj = toFind;
    },
  },
};
</script>

<style></style>
