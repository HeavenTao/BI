<template>
  <div>
    <q-tabs v-model="tab" dense>
      <q-tab dense name="page" label="页面文档" />
      <q-tab dense name="component" label="组件库" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="page"> page </q-tab-panel>
      <q-tab-panel name="component">
        <q-tree default-expand-all :nodes="components" node-key="label">
          <template v-slot:default-header="prop">
            <div
              class="row items-center"
              v-on:dragstart="onDragStart(prop.node, $event)"
              draggable="true"
              style="cursor: move"
            >
              <div>{{ prop.node.label }}</div>
            </div>
          </template>
        </q-tree>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import designHelper from "src/cmpobj/designHelper";
export default {
  name: "PageDocument",
  props: {},
  data() {
    return {
      tab: "component",
      components: [
        {
          label: "基本组件",
          children: [
            {
              type: "TextCmp",
              label: "文本组件",
            },
          ],
        },
        {
          label: "布局组件",
          children: [
            {
              type: "AbsoluteLayoutCmp",
              label: "定位布局",
            },
            {
              type: "GridLayoutCmp",
              label: "栅格布局",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onDragStart(node, e) {
      designHelper.cmpLibDragStart(node, e);
    },
  },
};
</script>

<style></style>
