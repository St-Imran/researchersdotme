import Typography from "@mui/material/Typography";
import style from "./Contact.module.css";

export default function ContactUs() {
  return (
    <Typography component="div" className={style.contact__section}>
      <Typography variant="h1">Contact Us</Typography>
    </Typography>
  );
}
