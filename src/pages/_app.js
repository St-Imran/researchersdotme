// pages/_app.js
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import "./Component/Card.css";
import "./services/Services.css";
import "../styles/blogs.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "80px", marginTop: "10px" }}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
