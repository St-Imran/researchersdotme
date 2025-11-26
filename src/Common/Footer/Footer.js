import FooterTop from "../FooterTop/FooterTop";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <div className={styles.footer__main}>
      <div className="container">
        <FooterTop />
      </div>
    </div>
  );
}
export default Footer;
