import {Card} from '@core/components/card';
import type {ChangeEvent} from 'react';

export interface Option {
  value: string;
  text: string;
}

export interface BaseSettingsProps {
  title: string;
  currentValue: string;
  setValue: (theme: string) => void;
  options: Option[];
  name: string;
}

export const BaseSettings = (props: BaseSettingsProps): JSX.Element => {
  const {currentValue, setValue, title, options, name} = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <Card title={title} className='mb-2'>
      {options.map((option) => (
        <label
          className='inline-flex items-center mt-2 h-10 w-full sm:w-1/4 md:w-1/5 lg:w-1/6 cursor-pointer'
          key={option.value}
          htmlFor={`rd-${name}-${option.value}`}
        >
          <input
            id={`rd-${name}-${option.value}`}
            type='radio'
            className='form-radio'
            name={name}
            value={option.value}
            checked={currentValue === option.value}
            onChange={onChange}
          />
          <span className='ml-2'>{option.text}</span>
        </label>
      ))}
    </Card>
  );
};
