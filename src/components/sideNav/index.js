import { data } from "@/pages/services/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./sidenav.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const SideNav = () => {
    const router = useRouter();
    const [expanded, setExpanded] = useState([]);

    const updateExpanded = (url) => {
        const exp = [...expanded];
        const index = exp.indexOf(url);
        index === -1 ? exp.push(url) : exp.splice(index, 1);
        setExpanded([
            ...exp
        ]);
    }

    return (
        <div className={styles.sidebar}>
            <ul className="nav flex-column">
                {data.map((item, i) => (
                    <li key={'side-item-' + i} className={styles.sidebar_navitem}>
                        {item.subSections ? (
                            <div className={styles.subSection}>
                                <div
                                    className={styles.secHeading}
                                    onClick={() => updateExpanded(item.url)}
                                >
                                    <a>{item.title}</a>
                                    {expanded.includes(item.url) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </div>
                                {expanded.includes(item.url) && (
                                    <ul className="nav flex-column">
                                        {item.subSections.map((sub, j) => (
                                            <li key={`sub-sec-` + j}>
                                                <Link
                                                    href={sub.url}
                                                >
                                                    {sub.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link
                                href={item.url}
                                className={item.url.includes(router.query.page) && 'active'}
                            >
                                {item.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideNav;
