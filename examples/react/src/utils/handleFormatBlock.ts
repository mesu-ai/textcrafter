import { getActiveRange } from "./getActiveRange";

const BLOCK_TAGS = new Set(["P", "BLOCKQUOTE", "H1", "H2", "H3"]);

function findClosestBlock(
  node: Node,
  editorRoot: HTMLElement
): HTMLElement | null {
  let el =
    node.nodeType === Node.TEXT_NODE
      ? node.parentElement
      : (node as HTMLElement);

  while (el && el !== editorRoot) {
    if (BLOCK_TAGS.has(el.tagName)) return el;
    el = el.parentElement!;
  }

  return null;
}

function placeCaretInside(el: HTMLElement, atEnd = true) {
  const range = document.createRange();
  const sel = window.getSelection();

  range.selectNodeContents(el);
  range.collapse(atEnd);

  sel?.removeAllRanges();
  sel?.addRange(range);
}

export function handleFormatBlock(
  tag: keyof HTMLElementTagNameMap,
  editorRoot: HTMLElement
) {
  const range = getActiveRange();
  if (!range) return;

  // Safety: selection must be inside this editor
  const common =
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as Element)
      : range.commonAncestorContainer.parentElement;

  if (!common || !editorRoot.contains(common)) return;

  const block = findClosestBlock(range.startContainer, editorRoot);

  // Case 1: already inside a real block → replace it
  if (block) {
    if (block.tagName.toLowerCase() === tag.toLowerCase()) return;

    const newBlock = document.createElement(tag);

    while (block.firstChild) {
      newBlock.appendChild(block.firstChild);
    }

    block.replaceWith(newBlock);
    placeCaretInside(newBlock);
    return;
  }

  // Case 2: no block (text directly under editor root)
  // wrap selection or create new block
  const newBlock = document.createElement(tag);

  if (!range.collapsed) {
    newBlock.appendChild(range.extractContents());
    range.insertNode(newBlock);
  } else {
    // collapsed caret → create empty block
    newBlock.appendChild(document.createTextNode("\u200B"));
    range.insertNode(newBlock);
  }

  placeCaretInside(newBlock);
}
