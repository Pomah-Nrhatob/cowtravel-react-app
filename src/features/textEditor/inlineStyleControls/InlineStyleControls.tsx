import { EditorState } from "draft-js";
import React, { FC } from "react";
import { FormatButton } from "../formatButton";
import { TEXT_EDITOR_INLINE_TYPES } from "../constants";

type TProps = {
  editorState: EditorState;
  onToggle: (value: string) => void;
};

export const InlineStyleControls: FC<TProps> = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="TextEditor-Sub-Buttons">
      {TEXT_EDITOR_INLINE_TYPES.map((type) => {
        return (
          <FormatButton
            key={type.lable}
            isActive={currentStyle.has(type.style)}
            onToggle={onToggle}
            size={type.size}
            style={type.style}
            typeIcon={type.icon}
          />
        );
      })}
    </div>
  );
};
