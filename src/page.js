import styles from "./globals.css";
import Header from "./Common/Header/Header";
import Footer from "./Common/Footer/Footer";
import FixedButton from "./Common/Contact/FixedButton";
import Hero from "./Hero";
import About from "./pages/about";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <FixedButton />
      <Footer />
    </>
  );
}
