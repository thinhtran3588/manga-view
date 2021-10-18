import {useEffect, useState} from 'react';

export type NoSsrProps = {
  children?: React.ReactNode;
};

export const NoSsr = (props: NoSsrProps): JSX.Element => {
  const {children} = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return <>{children}</>;
  }
  return <></>;
};
