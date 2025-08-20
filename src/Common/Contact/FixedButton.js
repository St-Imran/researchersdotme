import Image from "next/image";
import styles from "./FixedButton.module.css";
function FixedButton() {
  return (
    <div className={styles.fixedButton}>
      <a href="tel:+971565747998">
        <Image
          src="/contact-icon.png"
          alt="Company Logo"
          width={24}
          height={24}
        />
      </a>
      <a href="mailto:Info@researchers.me">
        <Image
          src="/Email-icon.png"
          alt="Company Logo"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
}
export default FixedButton;
