import Image from "next/image";
import styles from "./FixedButton.module.css";
function FixedButton() {
  return (
    <div className={styles.fixedButton}>
      <a href="/contact-us">
        <Image src="/contact-icon.png" alt="Company Logo" width={24} height={24} />
      </a>
      <a href="/contact-us">
        <Image src="/whatsapp-icon-2040x2048.png" alt="Company Logo" width={24} height={24} />
      </a>
      <a href="/contact-us">
        <Image src="/Email-icon.png" alt="Company Logo" width={24} height={24} />
      </a>
      <a href="/contact-us">
        <Image src="/linkedin-icon-2040x2048.png" alt="Company Logo" width={24} height={24} />
      </a>
    </div>
  );
}
export default FixedButton;
