import React, { FC } from "react";
import "./FormatButton.scss";

type TProps = {
  isActive?: boolean;
  onToggle: (style: string) => void;
  size?: string;
  style: string;
  typeIcon?: string;
};

export const FormatButton: FC<TProps> = ({
  isActive,
  onToggle,
  size,
  style,
  typeIcon,
}) => {
  return (
    <div
      className={isActive ? "FormatButton-Active" : "FormatButton"}
      onMouseDown={(event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        onToggle?.(style);
      }}
    >
      {typeIcon}
    </div>
  );
};
