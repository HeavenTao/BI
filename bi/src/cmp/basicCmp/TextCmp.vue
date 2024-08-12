<template>
  <div :style="style" v-on="cmpEvts()">{{ text }}</div>
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
