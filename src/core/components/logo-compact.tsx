/* eslint-disable max-len */
import clsx from 'clsx';

export interface LogoProps {
  className?: string;
}

export const LogoCompact = (props: LogoProps): JSX.Element => {
  const {className} = props;

  return (
    <>
      <svg
        viewBox='0 0 1024 1024'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={clsx('dark:hidden', className)}
      >
        <path
          d='M153.486 217.9V189.4H328.286L601.886 770.8L570.536 843H447.036L153.486 217.9ZM690.236 568.45H686.436L622.786 722.35L541.086 547.55L690.236 189.4H870.736V843H690.236V568.45ZM153.486 311.95L328.286 684.35V843H153.486V311.95Z'
          fill='url(#compact_logo0_linear)'
        />
        <defs>
          <linearGradient
            id='compact_logo0_linear'
            x1='-9.53674e-07'
            y1='512'
            x2='1024'
            y2='512'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#2563EB' />
            <stop offset='1' stopColor='#7C3AED' />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox='0 0 1024 1024'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={clsx('hidden dark:block', className)}
      >
        <path
          d='M153.486 217.9V189.4H328.286L601.886 770.8L570.536 843H447.036L153.486 217.9ZM690.236 568.45H686.436L622.786 722.35L541.086 547.55L690.236 189.4H870.736V843H690.236V568.45ZM153.486 311.95L328.286 684.35V843H153.486V311.95Z'
          fill='url(#compact_logo1_linear)'
        />
        <defs>
          <linearGradient
            id='compact_logo1_linear'
            x1='-9.53674e-07'
            y1='512'
            x2='1024'
            y2='512'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#60A5FA' />
            <stop offset='1' stopColor='#A78BFA' />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
