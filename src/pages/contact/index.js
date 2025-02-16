import Typography from "@mui/material/Typography";
import style from "./Contact.module.css";

export default function ContactUs() {
  return (
    <Typography component="div" className={style.contact__section}>
      <Typography variant="h1">Contact our Support<br />and Sales team</Typography>
      <p>Need to get in touch with the team?</p>
      <a href="mailto:Info@researchers.me" className={style.button}>Visit Support</a>
      <div className={style.after}>
        <img src="/Contact.png" alt="contact for MENA" className={style.image} />
      </div>
    </Typography>
  );
}
