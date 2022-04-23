import BottomNav from './BottomNav';

type LayoutProps = {
  children: React.ReactElement;
}

export default function Layout({children}: LayoutProps) {
  return (
    <>
      {children}
      <BottomNav/>
    </>
  );
}
