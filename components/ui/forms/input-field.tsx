import React from 'react';
import { clsx } from 'clsx';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputField({ className, ...props }: InputProps) {
  return (
    <input
      type="text"
      className={clsx(
        className,
        'rounded-md px-2 border border-gray-300 text-xs py-1'
      )}
      {...props}
    />
  );
}
