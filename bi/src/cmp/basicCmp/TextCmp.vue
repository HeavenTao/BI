<template>
  <div :style="positionStyle">
    <div :style="style" class="full-height" v-on="eventList">
      {{ text }}
    </div>
    <div v-if="isDesign" :style="designStyle"></div>
  </div>
</template>

<script>
import componentBase from "../componentBase";
export default {
  name: "TextCmp",
  extends: componentBase,
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
