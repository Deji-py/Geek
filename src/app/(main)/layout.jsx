import Footer from "@/components/molecules/shared/Footer";
import Header from "@/components/molecules/shared/Header";

export const revalidate = 1;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
