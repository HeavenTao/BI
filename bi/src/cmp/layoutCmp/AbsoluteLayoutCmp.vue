<template>
  <div :style="positionStyle">
    <div :style="style" v-on="eventList">hello AbsoluteLayoutCmp</div>
    <div v-if="isDesign" :style="designStyle"></div>
  </div>
</template>

<script>
import LayoutComponentBase from "../layoutComponentBase";
export default {
  name: "AbsoluteLayoutCmp",
  extends: LayoutComponentBase,
};
</script>

<style></style>
