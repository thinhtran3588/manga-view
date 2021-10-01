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
    <div className={clsx('bg-white dark:bg-gray-600 shadow-xl p-2 rounded-xl', className)}>
      {Boolean(title) && !CustomHeader && <div className={clsx(headerClassName, 'font-semibold pb-2')}>{title}</div>}
      {Boolean(CustomHeader) && <>{CustomHeader}</>}
      {Boolean(title || Boolean(CustomHeader)) && <hr />}
      <div className={clsx('', contentClassName)}>{children}</div>
      {Boolean(CustomFooter) && <>{CustomFooter}</>}
    </div>
  );
};
