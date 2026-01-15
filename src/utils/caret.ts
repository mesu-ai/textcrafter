export const placeCaretAfter = (node: Node) => {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  range.setStartAfter(node);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

export const placeCaretInside = (node: Node, atEnd: boolean = true) => {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(atEnd);
  sel.removeAllRanges();
  sel.addRange(range);
};
