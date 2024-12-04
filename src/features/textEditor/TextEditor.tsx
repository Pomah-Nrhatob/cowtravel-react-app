import clsx from "clsx";
import { convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  TEXT_EDITOR_CUSTOM_STYLES,
  TEXT_EDITOR_STYLE_TO_HTML,
} from "./constants";
import { TTextEditorTextStyle } from "./types";
import { BlockStyleControls } from "./blockStyleControls";
import { InlineStyleControls } from "./inlineStyleControls";
import "draft-js/dist/Draft.css";
import "./TextEditor.scss";

type TClasses = {
  textEditor?: string;
};

type TProps = {
  classes?: TClasses;
  isInvalid?: boolean;
  onChangeHTMLText?: (value: string) => void;
  placeholder?: string;
  title?: string;
  onChange: any;
  value: any;
  content?: string;
};

const TextEditorComponent: FC<TProps> = ({
  classes,
  isInvalid = false,
  onChangeHTMLText,
  placeholder,
  title,
  onChange,
  value,
  content,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  let wrapperClassName: string = "TextEditor-Wrapper";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      wrapperClassName += "TextEditor-Wrapper__hidePlaceholder";
    }
  }

  const options: {} = {
    styleToHTML: (style: string) => {
      TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle);
    },
  };

  const convertMessageToHTML = convertToHTML(options);

  const convertHtmlToRow = (html: string): EditorState => {
    const contentState = convertFromHTML({
      htmlToStyle: (nodeName, node, currentStyle) => {
        if (nodeName === "span" && node.className === "highlight") {
          return currentStyle.add("HIGHLIGHT");
        } else {
          return currentStyle;
        }
      },
    })(html);
    return EditorState.createWithContent(contentState);
  };

  useEffect(() => {
    content && setEditorState(convertHtmlToRow(content));
  }, []);

  useEffect(() => {
    onChange(convertToHTML(editorState.getCurrentContent()));
  }, [editorState]);

  const handleChangeBlur = () => {
    setFocused((prevState: boolean) => (prevState ? false : prevState));
  };

  const handleChangeFocus = () => {
    setFocused((prevState: boolean) => (prevState ? true : !prevState));
  };

  const handleChangeText = useCallback((value: EditorState): void => {
    setEditorState(value);
  }, []);

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [editorState, setEditorState]
  );

  const getBlockStyle = (block): string => {
    switch (block.getType("")) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  return (
    <div className={clsx("TextEditor", classes?.textEditor)}>
      <div className="TextEditor-Title">{title}</div>
      <div
        className={clsx("TextEditor-Area", {
          "TextEditor-Area__isFocused": isFocused || contentState.hasText(),
          "TextEditor-Area__isInvalid": isInvalid,
        })}
        onClick={handleChangeFocus}
      >
        <div className={wrapperClassName}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
            handleKeyCommand={handleKeyCommand}
            editorState={editorState}
            onChange={handleChangeText}
            onBlur={handleChangeBlur}
            placeholder={placeholder}
          />
        </div>
        <div className="TextEditor-Sub">
          <BlockStyleControls
            editorState={editorState}
            onToggle={(blockType: string): void => {
              const newState = RichUtils.toggleBlockType(
                editorState,
                blockType
              );
              setEditorState(newState);
            }}
          />
          <InlineStyleControls
            onToggle={(inlineStyle: string): void => {
              const newState = RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
              );
              setEditorState(newState);
            }}
            editorState={editorState}
          />
        </div>
      </div>
    </div>
  );
};

export const TextEditor = memo(TextEditorComponent);
