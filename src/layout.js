import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../globals.css"; // Ensure this path is correct based on your structure

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
