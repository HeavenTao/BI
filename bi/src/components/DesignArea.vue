<template>
  <div style="position: relative">
    <page-layout-cmp v-bind="pageObj"></page-layout-cmp>
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
      this.activeCmp = e;
    });
  },
  methods: {},
};
</script>

<style></style>
