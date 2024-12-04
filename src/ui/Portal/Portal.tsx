import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  id: string;
  children: ReactNode;
};

export const Portal: FC<PortalProps> = ({ id, children }) => {
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(
          "There is no portal container in markup. Please add portal container with proper id attribute."
        );
      }
      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

type containerOptions = {
  id: string;
  mountNode?: HTMLElement;
};

export const createContainer = (options: containerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement("div");

  portalContainer.setAttribute("id", id);
  mountNode?.appendChild(portalContainer);
};
