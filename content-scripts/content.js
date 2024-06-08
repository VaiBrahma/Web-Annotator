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
    setToolbarPosition({ 
      visibility: "hidden",
      animation: "none"
    });
  }
});

function getToolbarPosition() {
  const p = toolbar.shadowRoot.querySelector('.container').getBoundingClientRect();
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();

  return {
    left: Math.max(Number.parseInt(rangeBounds.left + rangeBounds.width / 2 - p.width/2), 0),
    top: Math.max(Number.parseInt(rangeBounds.top - p.height),0),
    display: "inline-flex",
    visibility: "visible",
    animation: "tickle"
  };
};
