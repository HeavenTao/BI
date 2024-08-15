import { uid } from "quasar";
import TextCmpObj from "src/cmpobj/basicCmpObj/textCmpObj";
import PageLayoutCmpObj from "src/cmpobj/layoutCmpObj/pageLayoutCmpObj";
import AbsoluteLayoutCmpObj from "src/cmpobj/layoutCmpObj/absoluteLayoutCmpObj";

const Common = {
  getUid() {
    var reg = /-/g;
    return "uid" + uid().replace(reg, "");
  },
  createCmpObjByType(type) {
    switch (type) {
      case "TextCmp":
        return new TextCmpObj();
      case "PageLayoutCmp":
        return new PageLayoutCmpObj();
      case "AbsoluteLayoutCmp":
        return new AbsoluteLayoutCmpObj();
      default:
        return null;
    }
  },
};

export default Common;
