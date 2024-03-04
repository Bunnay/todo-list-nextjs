import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        className,
        'bg-blue-800 text-white rounded-md px-2 py-1 text-xs border-0 ring-0'
      )}
      {...props}
    ></button>
  );
}
