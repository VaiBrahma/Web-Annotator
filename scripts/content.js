const toolbar = document.createElement("annotator-toolbar");
document.body.appendChild(toolbar);

const setToolbarPosition = (toolbarPosition) =>
  toolbar.setAttribute(
    "toolbarPosition",
    JSON.stringify(toolbarPosition)
  );

const getSelectedText = () => window.getSelection().toString();

document.addEventListener("click", () => {
  if (getSelectedText().length > 0) {
    setToolbarPosition(getToolbarPosition());
  }
});

document.addEventListener("selectionchange", () => {
  if (getSelectedText().length === 0) {
    setToolbarPosition({ display: "none" });
  }
});

function getToolbarPosition() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
  return {
    // Substract width of marker button -> 40px / 2 = 20
    left: rangeBounds.left + rangeBounds.width / 2 - 10* 1.95 * 7 ,
    top: rangeBounds.top - 60,
    display: "inline-flex",
  };
}
