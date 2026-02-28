import clsx from "clsx";
import React from "react";

import type { ContainerProps } from "./types";

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-[90rem] px-4 lg:px-8 sm:px-6 relative",
        className
      )}
    >
      {children}
    </div>
  );
};
