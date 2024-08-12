<template>
  <div>
    <q-tabs v-model="tab" dense>
      <q-tab dense name="page" label="页面文档" />
      <q-tab dense name="component" label="组件库" />
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
          label: "基本图形",
          children: [
            {
              label: "line",
            },
          ],
        },
        {
          label: "基本组件",
          children: [
            {
              label: "input",
            },
          ],
        },
        {
          label: "图表组件",
          children: [
            {
              label: "input",
            },
          ],
        },
        {
          label: "布局组件",
          children: [],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
