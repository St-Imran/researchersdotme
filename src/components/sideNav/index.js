import { data } from "@/constants/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "./sidenav.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";

const SideNav = ({ setSidebarOpen }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setSidebarOpen(isOpen);
  }, [isOpen, setSidebarOpen]);

  const updateExpanded = (keyPath) => {
    setExpanded((prev) => {
      const isOpen = !!prev[keyPath];
      // agar currently open hai to close kar do (saare keys clear)
      if (isOpen) return {};

      // agar open kar rahe hain, to sirf ye key aur iske ancestors ko true rakho
      const parts = keyPath.split("-");
      const newState = {};
      parts.forEach((_, idx) => {
        const k = parts.slice(0, idx + 1).join("-");
        newState[k] = true;
      });
      return newState;
    });
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <button
        className={`btn position-absolute top-0 end-0 ${styles.sideClose}`}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <CloseIcon sx={{ color: "white" }} />
        ) : (
          <MenuIcon sx={{ color: "white" }} />
        )}
      </button>
      <ul className="nav flex-column">
        {data.map((item, i) => (
          <li key={"side-item-" + i} className={styles.sidebar_navitem}>
            {item.subSections ? (
              <div className={styles.subSection}>
                <div
                  className={styles.secHeading}
                  onClick={() => updateExpanded(item.url)}
                >
                  <a>{item.title}</a>
                  {expanded[item.url] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </div>
                {expanded[item.url] && (
                  <ul className="nav flex-column">
                    {item.subSections.map((sub, j) => (
                      <li key={`sub-sec-` + j}>
                        <div
                          className="d-flex align-items-center"
                          onClick={() => updateExpanded(`${item.url}-${sub.url}`)}
                          style={{ cursor: sub.subSections ? "pointer" : "default" }}
                        >
                          <Link href={sub.url}>{sub.title}</Link>
                          {sub.subSections && (
                            expanded[`${item.url}-${sub.url}`] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )
                          )}
                        </div>
                        {sub.subSections && expanded[`${item.url}-${sub.url}`] && (
                          <ul className="nav flex-column ms-3">
                            {sub.subSections.map((sub2, k) => (
                              <li key={`sub-sec-2-` + k}>
                                <Link href={sub2.url}>{sub2.title}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                href={item.url}
                className={item.url.includes(router.query.page) && "active"}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
