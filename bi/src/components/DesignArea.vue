<template>
  <div style="position: relative; background-color: red" class="no-tabindex-style" @keyup.delete="del"
    @keyup.ctrl.c="copy" @keyup.ctrl.v="paste" tabindex="0">
    <page-layout-cmp v-if="pageObj" :id="pageObj.uid" v-bind="pageObj"></page-layout-cmp>
    <controller v-bind:cmp-obj="activeCmp"></controller>
  </div>
</template>

<script>
import PageLayoutCmp from "src/cmp/layoutCmp/PageLayoutCmp.vue";
import Controller from "./Controller.vue";
import designHelper from "src/cmpobj/designHelper";
export default {
  name: "DesignArea",
  components: { PageLayoutCmp, Controller },
  props: {
    pageObj: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      activeCmp: designHelper.activeCmp,
    };
  },
  created() {
    designHelper.outterEventBus.on("activeCmpChanged", (e) => {
      this.$nextTick(() => {
        this.activeCmp = e;
      })
    });
  },
  methods: {
    copy() {
      designHelper.copy();
    },
    paste() {
      designHelper.paste();
    },
    del() {
      designHelper.delActive();
    },
  },
};
</script>

<style></style>
