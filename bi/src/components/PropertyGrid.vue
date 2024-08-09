<template>
  <div>
    <q-tabs v-model="tab" class="text-teal">
      <q-tab name="layout" label="Mails" />
      <q-tab name="style" label="Alarms" />
      <q-tab name="data" label="Movies" />
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
