export interface MenuItem {
  key: string;
  href: string;
  current: boolean;
  icon: JSX.Element;
  focusedIcon: JSX.Element;
}
