import SideNav from '@/components/sideNav';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './innerPage.module.css';

export default function Page() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track sidebar status

    const CodeSampleModal = dynamic(() => import(`@/components/${router.asPath.replace('/', '')}`), {
        ssr: false,
    });

    return (
        <div className={styles.detailsPage}>
            <SideNav setSidebarOpen={setIsSidebarOpen} />
            <div
                className={`${styles.rightPanel} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
                    }`}
            >
                <CodeSampleModal />
            </div>
        </div>
    );
}
