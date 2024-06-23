import FooterTop from '../FooterTop/FooterTop';
import styles from './Footer.module.css'
function Footer() {
    return (
        <div className={styles.footer__main}>
            <FooterTop/>
        </div>
    )
}
export default Footer;