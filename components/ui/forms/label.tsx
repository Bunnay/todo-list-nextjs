import React from "react";
import { clsx } from "clsx";

export interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

export default function Label({ className, ...props }: LabelProps) {
  return <label className={clsx(className, "px-2 text-sm py-1")} {...props} />;
}
