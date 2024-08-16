import { extend } from "quasar";
import ComponentObjBase from "../componentObjBase";

export default class TextCmpObj extends ComponentObjBase {
  text;
  fontStyle;

  constructor() {
    super();
    this.name = "文本组件";
    this.type = "TextCmp";
    this.text = "Text";
    this.fontStyle = {
      fontSize: 14,
      textAlign: "left",
      color: "white",
      fontWeight: "normal",
      wrap: true,
      fontFamily: "",
    };
  }
}
