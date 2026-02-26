import React from "react";
import clsx from "clsx";
import { ContainerProps } from "./types";

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
