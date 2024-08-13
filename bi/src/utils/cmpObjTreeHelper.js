export default {
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
};
