<template>
  <div>
    <q-tabs
      dense
      active-bg-color="primary"
      active-color="white"
      indicator-color="primary"
      v-model="tab"
    >
      <q-tab name="style" label="样式" />
      <q-tab name="layout" label="布局" />
      <q-tab name="data" label="数据" />
      <q-tab name="event" label="交互" />
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: "PropertyGrid",
  data() {
    return {
      tab: "layout",
    };
  },
};
</script>
