import { ReactNode } from "react";

export type QuestionsHeaderProps = {
  children?: ReactNode;
  wrapperClassName?: string;
  contentClassName?: string;
  showLogo?: boolean;
  logoHref?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoSize?: number;
  logoClassName?: string;
  variant?: "light" | "dark";
};
