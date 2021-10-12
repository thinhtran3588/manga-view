/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import {forwardRef} from 'react';
import type {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {Color} from '@core/interfaces';

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  color?: Color;
  variant?: 'contained' | 'outline';
};

const getButtonClassName = (color: Color, variant: 'contained' | 'outline'): string => {
  const buttonColor = color === 'default' ? 'gradient' : color;
  if (variant === 'contained') {
    return `bg-${buttonColor} dark:bg-${buttonColor}-light text-white py-2 px-4`;
  }

  return `border-${buttonColor} dark:border-${buttonColor}-light 
    text-${buttonColor} dark:text-${buttonColor}-light border-2 py-2 px-4`;
};

export const Button = forwardRef<HTMLButtonElement>((props: ButtonProps, ref): JSX.Element => {
  const {className, children, color = 'default', variant = 'contained', ...other} = props;
  const buttonClassName = clsx(
    'disabled:opacity-50 rounded-full font-bold shadow-xl',
    getButtonClassName(color, variant),
    className,
  );
  return (
    <button ref={ref} className={buttonClassName} {...other}>
      {children}
    </button>
  );
}) as unknown as (props: ButtonProps) => JSX.Element;
