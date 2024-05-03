// import styles from "./page.module.css";
import Header from "./Common/Header/Header";
import Footer from "./Common/Footer/Footer";
import FixedButton from "./Common/Contact/FixedButton";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FixedButton />
      <Footer />
    </>
  );
}
