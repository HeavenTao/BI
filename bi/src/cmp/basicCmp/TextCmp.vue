<template>
  <div :style="style">{{ text }}</div>
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
