<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="no-padding">
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="mdi-image-edit-outline" size="xs"></q-icon>
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer side="left" :width="240" show-if-above v-model="leftDrawerOpen">
      <page-document></page-document>
    </q-drawer>

    <q-drawer side="right" :width="400" show-if-above v-model="rightDrawerOpen">
      <property-grid></property-grid>
    </q-drawer>

    <q-page-container>
      <q-page class="column bg-grey-3 q-pa-xs" ref="scroll">
        <div class="col">
          <div
            :style="{ width: fullWidth + 'px', height: fullHeight + 'px' }"
            style="background-color: white"
          >
            <page-layout-cmp v-bind="pageObj"></page-layout-cmp>
          </div>
        </div>
        <div class="row items-center justify-end q-py-xs">
          <span>
            <q-input style="width: 100px" outlined dense type="number">
              <template v-slot:append>
                <span style="font-size: 16px">%</span>
              </template>
            </q-input>
          </span>
          <div>
            <q-icon size="sm" name="mdi-minus" v-on:click="minusScale" />
          </div>
          <div>
            <q-slider
              v-model="scale"
              v-bind:min="10"
              v-bind:max="300"
              style="width: 200px"
            />
          </div>
          <div>
            <q-icon size="sm" name="mdi-plus" v-on:click="plusScale" />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import PageDocument from "../components/PageDocument.vue";
import PropertyGrid from "../components/PropertyGrid.vue";
import PageLayoutCmp from "src/cmp/layoutCmp/PageLayoutCmp.vue";
import PageLayoutCmpObj from "src/cmpobj/layoutCmpObj/pageLayoutCmpObj";
import TextCmpObj from "src/cmpobj/basicCmpObj/textCmpObj";
export default {
  name: "MainLayout",
  components: { PageDocument, PropertyGrid, PageLayoutCmp },
  data() {
    return {
      scale: 100,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      fullWidth: 1000,
      fullHeight: 650,
      pageObj: new PageLayoutCmpObj(),
    };
  },
  created() {
    this.pageObj.w = this.fullWidth;
    this.pageObj.h = this.fullHeight;

    var textCmpObj = new TextCmpObj();
    textCmpObj.x = 100;
    textCmpObj.y = 100;
    textCmpObj.w = 120;
    textCmpObj.h = 30;
    textCmpObj.backgroundStyle.color = "lightblue";
    this.pageObj.childs.push(textCmpObj);
  },
  methods: {
    minusScale() {},
    plusScale() {},
  },
};
</script>
