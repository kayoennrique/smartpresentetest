"use client";

import SecondStepDetails from "./SecondStepDetails";
import SecondStepTips from "./SecondStepTips";
import type { SecondStepProps } from "./types";

export default function SecondStep(props: SecondStepProps) {
  if (props.mode === "tips") {
    return <SecondStepTips {...props} items={props.items} />;
  }

  return <SecondStepDetails {...props} products={props.products} />;
}
