import { extend } from "quasar";
import ComponentObjBase from "../componentObjBase";

export default class TextCmpObj extends ComponentObjBase {
  text;
  fontStyle;

  constructor() {
    super();
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
