import {Listbox as HeadlessuiListbox} from '@headlessui/react';
import clsx from 'clsx';

export interface HeadlessuiListboxProps {
  selectedValue: string;
  setValue: (value: string) => void;
  options: {
    value: string;
    text: string;
    disable?: boolean;
  }[];
  containerClassName?: string;
  buttonClassName?: string;
  optionContainerClassName?: string;
  optionClassName?: string;
}

export const ListBox = (props: HeadlessuiListboxProps): JSX.Element => {
  const {
    selectedValue,
    setValue,
    options,
    containerClassName,
    buttonClassName,
    optionClassName,
    optionContainerClassName,
  } = props;

  return (
    <div className={clsx('flex relative min-w-0', containerClassName)}>
      <HeadlessuiListbox value={selectedValue} onChange={setValue}>
        <HeadlessuiListbox.Button
          className={clsx(
            'flex flex-1 px-4 py-2 min-w-0 rounded-full bg-gray-300 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80',
            buttonClassName,
          )}
        >
          <span className='overflow-hidden whitespace-nowrap overflow-ellipsis'>
            {options.find((o) => o.value === selectedValue)?.text}
          </span>
        </HeadlessuiListbox.Button>
        <HeadlessuiListbox.Options
          className={clsx(
            `top-12 left-0 right-0 rounded-xl pt-3 pb-3 max-h-72 overflow-auto
            bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 fixed sm:absolute`,
            optionContainerClassName,
          )}
        >
          {options.map((option) => (
            <HeadlessuiListbox.Option
              key={option.value}
              value={option.value}
              disabled={option.disable}
              className={clsx(
                'disabled:opacity-50 cursor-pointer p-3 hover:bg-gray-200 dark:hover:bg-gray-600',
                option.value === selectedValue ? 'text-primary dark:text-primary-light' : '',
                optionClassName,
              )}
            >
              {option.text}
            </HeadlessuiListbox.Option>
          ))}
        </HeadlessuiListbox.Options>
      </HeadlessuiListbox>
    </div>
  );
};
