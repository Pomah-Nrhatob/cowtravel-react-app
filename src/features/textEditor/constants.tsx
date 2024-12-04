import { TTextEditorTextStyle } from "./types";

export const TEXT_EDITOR_STYLE_TO_HTML = (style: TTextEditorTextStyle) => {
  switch (style) {
    case "H1":
      return <h1 />;
    case "H2":
      return <h2 />;
    case "OL":
      return <ol />;
    case "UL":
      return <ul />;
    case "BOLD":
      return <strong />;
    case "UNDERLINE":
      return <u />;
    case "HIGHLIGHT":
      return <span className="highlight" />;
    default:
      return null;
  }
};

export const TEXT_EDITOR_CUSTOM_STYLES = {
  HIGHLIGHT: {
    backgroundColor: "#8fcbe5",
    color: "#fff",
  },
};

export const TEXT_EDITOR_BLOCK_TYPES: any[] = [
  {
    lable: "H1",
    style: "header-one",
    icon: "H1",
    size: "extra-small",
  },
  {
    lable: "H2",
    style: "header-two",
    icon: "H2",
    size: "extra-small",
  },
  {
    lable: "H3",
    style: "header-three",
    icon: "H3",
    size: "extra-small",
  },
  {
    lable: "OL",
    style: "ordered-list-item",
    icon: "OL",
    size: "medium",
  },
  {
    lable: "UL",
    style: "unordered-list-item",
    icon: "UL",
    size: "medium",
  },
];

export const TEXT_EDITOR_INLINE_TYPES: any[] = [
  {
    lable: "Bold",
    style: "BOLD",
    icon: "Bold",
    size: "extra-small",
  },
  {
    lable: "Underline",
    style: "UNDERLINE",
    icon: "Underline",
    size: "extra-small",
  },
  {
    lable: "Highlight",
    style: "HIGHLIGHT",
    icon: "Highlight",
    size: "small",
  },
  {
    lable: "Italic",
    style: "ITALIC",
    icon: "Italic",
    size: "small",
  },
];
