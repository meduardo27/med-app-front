import Footer from "./Footer";
import Navbar from "./Navbar";

export default function MainContainer({ children }: { children: any }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
