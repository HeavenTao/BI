<template>
  <div :style="style">
    <component
      v-for="child in childs"
      :is="child.type"
      :key="child.uid"
      v-bind="child"
    ></component>
  </div>
</template>

<script>
import TextCmp from "../basicCmp/TextCmp.vue";
import AbsoluteLayoutCmp from "./AbsoluteLayoutCmp.vue";
export default {
  name: "PageLayoutCmp",
  extends: AbsoluteLayoutCmp,
  components: {
    TextCmp,
  },
  props: {
    showGrid: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "relative",
    },
  },
};
</script>

<style></style>
