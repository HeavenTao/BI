import dockEnum from "src/enums/dockEnum";
import Common from "src/utils/common";
export default class ComponentObjBase {
  parent;
  uid;
  name;
  w;
  h;
  x;
  y;
  dock;
  anchor;
  zIndex;
  isDesign;
  active;
  lock;
  borderStyle;
  backgroundStyle;
  type;
  eventBus;

  constructor() {
    this.parent = null;
    this.uid = Common.getUid();

    this.w = 100;
    this.h = 100;
    this.x = 0;
    this.y = 0;
    this.dock = dockEnum.None.value;
    this.anchor = [];
    this.zIndex = 0;
    this.isDesign = true;
    this.active = false;
    this.lock = false;
    this.borderStyle = {
      borderType: "normal", //normal:传统边框 //decoration:装饰器,
      borderSide: "all", //all:全部边框，single//勾选单个边框
      borderRadius: 0, //圆角
      allSetting: {
        style: "solid",
        width: 0,
        color: "#000000",
        padding: 0,
      },
      singleSetting: [
        {
          name: "Left",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
        {
          name: "Top",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
        {
          name: "Right",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
        {
          name: "Bottom",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
      ],
      decorationSetting: {
        style: "1", //边框样式编号
        borderConfig: {
          color1: "#4fd2dd",
          color2: "#235fa7",
          reverse: false,
          needResize: true,
          backgroundColor: "transparent",
          title: "标题",
          titleWidth: 250,
          titleStyle: {
            fontSize: 18,
            textAlign: "center",
            color: "#fff",
            fontWeight: "normal",
          },
          dur: 3,
        },
        padding: [15, 15, 15, 15],
      },
    };
    this.backgroundStyle = {
      color: "#ffffff00",
      image: {
        url: "",
        repeat: "stretch",
        opacity: 100,
      },
    };
  }

  loadSetting(setting) {}
  saveSetting() {
    return "";
  }
}
