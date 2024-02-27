import React from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={clsx(
        className,
        'rounded-md px-2 border border-gray-300 text-sm py-1'
      )}
      {...props}
    />
  );
}
