import styles from "./page.module.css";
import Header from "./Common/Header/Header";
import Footer from "./Common/Footer/Footer";
import FixedButton from "./Common/Contact/FixedButton";
import Hero from "./Hero";
import About from './pages/about'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <p style={{textAlign: 'center', padding: '20px'}}>Here begins the content for the About page.</p>
      <About/>
      <FixedButton />
      <Footer />
    </>
  );
}
