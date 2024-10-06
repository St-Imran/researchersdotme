import styles from "./globals.css";
import Header from "./common/Header/Header";
import Footer from "./common/Footer/Footer";
import FixedButton from "./common/Contact/FixedButton";
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
