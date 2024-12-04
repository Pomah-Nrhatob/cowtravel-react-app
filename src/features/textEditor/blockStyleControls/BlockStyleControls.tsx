import { EditorState } from "draft-js";
import React, { FC } from "react";
import { FormatButton } from "../formatButton";
import { TEXT_EDITOR_BLOCK_TYPES } from "../constants";

type TProps = {
  editorState: EditorState;
  onToggle: (style: string) => void;
};

export const BlockStyleControls: FC<TProps> = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="TextEditor-Sub-Buttons">
      {TEXT_EDITOR_BLOCK_TYPES.map((type) => {
        return (
          <FormatButton
            key={type.lable}
            isActive={type.style === blockType}
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
