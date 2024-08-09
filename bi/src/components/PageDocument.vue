<template>
  <div>
    <q-tabs v-model="tab" class="text-teal" dense>
      <q-tab dense name="page" label="Page" />
      <q-tab dense name="component" label="Compoments" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="page"> page </q-tab-panel>
      <q-tab-panel name="component">
        <q-tree :nodes="components" node-key="label" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
export default {
  name: "PageDocument",
  props: {},
  data() {
    return {
      tab: "component",
      components: [
        {
          label: "basic",
          children: [
            {
              label: "line",
            },
          ],
        },
        {
          label: "standard",
          children: [
            {
              label: "input",
            },
          ],
        },
        {
          label: "group",
          children: [],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
