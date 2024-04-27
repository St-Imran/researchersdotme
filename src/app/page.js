import Image from "next/image";
import styles from "./page.module.css";
import Header from "./Common/Header/Header";
import Footer from "./Common/Footer/Footer";
import FixedButton from "./Common/Contact/FixedButton";
import FooterTop from "./Common/FooterTop/FooterTop";

export default function Home() {
  return (
    <>
      <Header />
      <FixedButton />
      <FooterTop/>
      <Footer />
    </>
  );
}
