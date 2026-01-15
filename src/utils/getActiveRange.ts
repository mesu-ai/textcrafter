export const getActiveRange = (): Range | undefined => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  return selection.getRangeAt(0);
};
