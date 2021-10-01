/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx';
import type {InputHTMLAttributes, DetailedHTMLProps} from 'react';
import {forwardRef} from 'react';

export type SearchBarProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  inputClassName?: string;
};

export const SearchBar = forwardRef<HTMLInputElement>((props: SearchBarProps, ref): JSX.Element => {
  const {inputClassName, className, ...other} = props;

  return (
    <div className={clsx('flex rounded-full bg-white dark:bg-gray-600 p-2 shadow-xl', className)}>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <input className={clsx('bg-transparent outline-none ml-2', inputClassName)} ref={ref} {...other} />
    </div>
  );
}) as unknown as (props: SearchBarProps) => JSX.Element;
