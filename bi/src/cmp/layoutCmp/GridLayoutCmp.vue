<template>
  <div :style="positionStyle">
    <div style="user-select: none" :style="style" v-on="eventList">
      <div v-if="isDesign" :style="designStyle"></div>
    </div>
  </div>
</template>

<script>
import LayoutComponentBase from "../layoutComponentBase";
export default {
  name: "GridLayoutCmp",
  extends: LayoutComponentBase,
};
</script>
