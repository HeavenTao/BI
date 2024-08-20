<template>
  <div :style="positionStyle">
    <div style="user-select: none" :style="style" v-on="eventList">
      <div v-if="isDesign" :style="designStyle"></div>
      <component v-for="child in childs" :is="child.type" :key="child.uid" :id="child.uid" v-bind="child"></component>
    </div>
  </div>
</template>

<script>
import TextCmp from "../basicCmp/TextCmp.vue";
import AbsoluteLayoutCmp from "./AbsoluteLayoutCmp.vue";
import GridLayoutCmp from "./GridLayoutCmp.vue"
export default {
  name: "PageLayoutCmp",
  extends: AbsoluteLayoutCmp,
  components: {
    TextCmp,
    AbsoluteLayoutCmp,
    GridLayoutCmp
  },
  props: {
    showGrid: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "absolute",
    },
  },
  methods: {},
};
</script>

<style></style>
