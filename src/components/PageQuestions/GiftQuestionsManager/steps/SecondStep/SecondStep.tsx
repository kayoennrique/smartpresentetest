"use client";

import type { SecondStepProps } from "./types";
import SecondStepTips from "./SecondStepTips";
import SecondStepDetails from "./SecondStepDetails";

export default function SecondStep(props: SecondStepProps) {
  if (props.mode === "tips") {
    return <SecondStepTips {...props} items={props.items} />;
  }

  return <SecondStepDetails {...props} products={props.products} />;
}
