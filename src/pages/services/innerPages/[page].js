import SideNav from '@/components/sideNav';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import styles from './innerPage.module.css'

export default function Page() {
    const router = useRouter()
    console.log("router here", router)
    const CodeSampleModal = dynamic(() => import(`@/components/${router.asPath.replace('/', '')}`), {
        ssr: false,
    });

    return (
        <div className={styles.detailsPage}>
            <SideNav />
            <div className={styles.rightPanel}>
                <CodeSampleModal />
            </div>
        </div>
    )
}