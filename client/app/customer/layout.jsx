import "../globals.css";
import Footer from "../ui/Footer";
import Navbar from "../ui/navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
