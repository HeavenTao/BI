<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <div class="row items-center">
        <div class="col-2">
          <q-toolbar class="no-padding">
            <q-toolbar-title>
              <q-avatar>
                <q-icon name="mdi-image-edit-outline" size="xs"></q-icon>
              </q-avatar>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col">
          <div class="row no-wrap justify-center items-center content-center">
            <q-btn
              flat
              round
              dense
              color="white"
              icon="mdi-briefcase-upload-outline"
            >
              <q-tooltip>上传组合组件</q-tooltip>
            </q-btn>
            <q-separator vertical dark></q-separator>
            <q-btn-group dense flat>
              <q-btn flat round dense color="white" icon="mdi-select-group">
                <q-tooltip>组合</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="white" icon="mdi-select-off">
              </q-btn>
            </q-btn-group>
            <q-separator vertical dark></q-separator>
            <q-btn-group dense flat>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-align-vertical-top"
              >
                <q-tooltip>顶端对齐</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-align-horizontal-right"
              >
                <q-tooltip>右对齐</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-align-vertical-bottom"
              >
                <q-tooltip>低端对齐</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-align-horizontal-left"
              >
                <q-tooltip>左对齐</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="white" icon="mdi-view-parallel">
                <q-tooltip>横向分布</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="white" icon="mdi-view-sequential">
                <q-tooltip>纵向分布</q-tooltip>
              </q-btn>
            </q-btn-group>
            <q-separator vertical dark></q-separator>
            <q-btn-group dense flat>
              <q-btn flat round dense color="white" icon="mdi-arrow-expand-all">
                <q-tooltip>宽高与最大相等</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-arrow-collapse-all"
              >
                <q-tooltip>宽高与最小相等</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="white" icon="mdi-pan-horizontal">
                <q-tooltip>宽度与最大相等</q-tooltip>
              </q-btn>
              <q-btn flat round dense color="white" icon="mdi-pan-vertical">
                <q-tooltip>高度与最大相等</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-arrow-collapse-horizontal"
              >
                <q-tooltip>宽度与最小相等</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                color="white"
                icon="mdi-arrow-collapse-vertical"
              >
                <q-tooltip>高度与最小相等</q-tooltip>
              </q-btn>
            </q-btn-group>
            <q-separator vertical dark></q-separator>
            <q-btn dense flat icon="mdi-delete" @click="del">
              <q-tooltip>删除</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="mdi-undo">
              <q-tooltip>撤回</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="mdi-redo">
              <q-tooltip>重做</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="mdi-content-cut">
              <q-tooltip>剪切</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="mdi-content-copy" @click="copy">
              <q-tooltip>复制</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="mdi-content-paste" @click="paste">
              <q-tooltip>粘贴</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="mdi-lock">
              <q-tooltip>锁定</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div
          class="row no-wrap justify-end col-3 text-right q-pr-md q-gutter-sm"
        >
          <q-btn dense flat icon="mdi-format-float-left">
            <q-tooltip>隐藏左侧菜单</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="mdi-format-float-right">
            <q-tooltip>隐藏右侧菜单</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="mdi-laptop">
            <q-tooltip>原尺寸查看</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="mdi-desktop-mac-dashboard">
            <q-tooltip>全屏查看</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="mdi-content-save" v-on:click="save">
            <q-tooltip>保存图形</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="mdi-arrow-up-circle-outline">
            <q-tooltip>发布</q-tooltip>
          </q-btn>
        </div>
      </div>
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
          <design-area
            :style="{ width: fullWidth + 'px', height: fullHeight + 'px' }"
            :page-obj="cmpObjTree"
          >
          </design-area>
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
import DesignArea from "src/components/DesignArea.vue";
import designHelper from "src/cmpobj/designHelper";
import dataJson from "src/data";
export default {
  name: "MainLayout",
  components: { PageDocument, PropertyGrid, DesignArea },
  data() {
    return {
      scale: 100,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      fullWidth: 1000,
      fullHeight: 650,
      cmpObjTree: designHelper.cmpObjTree,
    };
  },
  created() {
    designHelper.outterEventBus.on("cmpObjTreeChanged", (e) => {
      this.cmpObjTree = e;
    });
  },
  mounted() {
    const data = this.loadData();
    designHelper.loadConfig(data);
  },
  methods: {
    copy() {
      designHelper.copy();
    },
    paste() {
      designHelper.paste();
    },
    del() {
      designHelper.delActive();
    },
    save() {
      designHelper.saveConfig();
    },
    loadData() {
      return dataJson.getData();
    },
    minusScale() {},
    plusScale() {},
  },
};
</script>
