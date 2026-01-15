import { getActiveRange } from "./getActiveRange";
import { placeCaretAfter } from "./caret";

export const wrapSelection = (
  tag: keyof HTMLElementTagNameMap,
  attrs?: Record<string, string>
) => {
  const range = getActiveRange();
  if (!range || range.collapsed) return;
  const frag = range.extractContents();
  const el = document.createElement(tag);
  if(attrs) Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));
  el.appendChild(frag);
  range.insertNode(el);
  placeCaretAfter(el);
};
