import Footer from "../sections/Footer";

interface LayoutProps {
  children: Children;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <div className="flex-grow h-full" />
      <Footer />
    </div>
  );
}

export default Layout;
