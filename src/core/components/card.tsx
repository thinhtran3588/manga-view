import clsx from 'clsx';

export interface CardProps {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  children?: React.ReactNode;
  CustomHeader?: React.ReactNode;
  CustomFooter?: React.ReactNode;
  title?: string;
}

export const Card = (props: CardProps): JSX.Element => {
  const {title, className, headerClassName, contentClassName, CustomHeader, CustomFooter, children} = props;
  return (
    <div className={clsx('transition-all duration-700 bg-white dark:bg-gray-600 shadow-xl p-2 rounded-md', className)}>
      {Boolean(title) && !CustomHeader && (
        <div
          className={clsx(
            headerClassName,
            'font-semibold bg-primary dark:bg-primary-light text-white -m-2 rounded-t-md p-2',
          )}
        >
          {title}
        </div>
      )}
      {Boolean(CustomHeader) && <>{CustomHeader}</>}
      <div className={clsx('', contentClassName)}>{children}</div>
      {Boolean(CustomFooter) && <>{CustomFooter}</>}
    </div>
  );
};
