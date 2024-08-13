import { uid } from "quasar";
import TextCmpObj from "src/cmpobj/basicCmpObj/textCmpObj";
import PageLayoutCmpObj from "src/cmpobj/layoutCmpObj/pageLayoutCmpObj";

const Common = {
  getUid() {
    var reg = /-/g;
    return "uid" + uid().replace(reg, "");
  },
  newCmpObj(type) {
    switch (type) {
      case "TextCmp":
        return new TextCmpObj();
      case "PageLayoutCmp":
        return new PageLayoutCmpObj();
    }
    return null;
  },
};

export default Common;
