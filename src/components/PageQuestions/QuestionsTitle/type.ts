import { ReactNode } from "react";

export type QuestionsTitleProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  variant?: "light" | "dark";
};
