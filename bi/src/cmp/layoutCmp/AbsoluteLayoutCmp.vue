<template>
  <div :style="positionStyle">
    <div style="user-select: none" :style="style" v-on="eventList">
      <div v-if="isDesign" :style="designStyle"></div>
      <component
        v-for="child in childs"
        :is="child.type"
        :key="child.uid"
        v-bind="child"
      ></component>
    </div>
  </div>
</template>

<script>
import LayoutComponentBase from "../layoutComponentBase";
import TextCmp from "../basicCmp/TextCmp.vue";
export default {
  name: "AbsoluteLayoutCmp",
  extends: LayoutComponentBase,
  components: { TextCmp },
};
</script>

<style></style>
