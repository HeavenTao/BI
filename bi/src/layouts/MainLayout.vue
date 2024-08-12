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
            style="background-color: white; position: relative"
          >
            <page-layout-cmp v-bind="pageObj"></page-layout-cmp>
            <controller v-bind.sync="controllerObj"></controller>
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
import Controller from "src/components/Controller.vue";
import mitt from "mitt";
export default {
  name: "MainLayout",
  components: { PageDocument, PropertyGrid, PageLayoutCmp, Controller },
  data() {
    return {
      scale: 100,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      fullWidth: 1000,
      fullHeight: 650,
      pageObj: new PageLayoutCmpObj(),
      controllerObj: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        isShow: false,
      },
    };
  },
  created() {
    var eventBus = mitt();
    eventBus.on("active", this.active);
    this.pageObj.w = this.fullWidth;
    this.pageObj.h = this.fullHeight;
    this.pageObj.eventBus = eventBus;
    this.pageObj.zIndex = 0;

    var textCmpObj = new TextCmpObj();
    //textCmpObj.loadSetting({});
    textCmpObj.x = 100;
    textCmpObj.y = 100;
    textCmpObj.w = 120;
    textCmpObj.h = 30;
    textCmpObj.backgroundStyle.color = "lightblue";
    textCmpObj.parent = this.pageObj;
    textCmpObj.eventBus = eventBus;
    textCmpObj.zIndex = 1;
    this.pageObj.childs.push(textCmpObj);
  },
  methods: {
    active(event) {
      //TODO:ht先考虑单个激活
      let toFind = this.findChildByUid([this.pageObj], event.uid);
      let position = this.getCmpAbsolutePosition(toFind);
      console.log(position);
      this.controllerObj.x = position.x;
      this.controllerObj.y = position.y;
      this.controllerObj.w = toFind.w;
      this.controllerObj.h = toFind.h;
      this.controllerObj.isShow = true;
      this.controllerObj.zIndex = toFind.zIndex;
      this.controllerObj.cmpObj = toFind;
    },
    findChildByUid(tree, uid) {
      for (let node of tree) {
        if (node.uid === uid) {
          return node;
        } else if (node.childs && node.childs.length > 0) {
          const result = this.findChildByUid(node.childs, uid);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    getCmpAbsolutePosition(cmp) {
      var position = {
        x: cmp.x,
        y: cmp.y,
      };
      if (cmp.parent) {
        var parentPosition = this.getCmpAbsolutePosition(cmp.parent);
        position.x += parentPosition.x;
        position.y += parentPosition.y;
      }
      return position;
    },
    minusScale() {},
    plusScale() {},
  },
};
</script>
