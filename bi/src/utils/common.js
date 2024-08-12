import { uid } from "quasar";

const Common = {
  getUid() {
    var reg = /-/g;
    return "uid" + uid().replace(reg, "");
  },
};

export default Common;
