/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import type {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import React from 'react';

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement>((props: ButtonProps, ref): JSX.Element => {
  const {className, children, ...other} = props;
  const buttonClassName = clsx(
    'bg-gradient dark:bg-gradient-light py-2 px-4 rounded-full text-white font-bold',
    className,
  );
  return (
    <button ref={ref} className={buttonClassName} {...other}>
      {children}
    </button>
  );
}) as unknown as (props: ButtonProps) => JSX.Element;
