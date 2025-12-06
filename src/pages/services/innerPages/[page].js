import SideNav from "@/components/sideNav";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./innerPage.module.css";

export default function Page() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { page } = router.query;

  // Don't render until we have the page parameter
  if (!page) {
    return null;
  }

  const CodeSampleModal = dynamic(
    () =>
      import(`@/components/services/innerPages/${page}`).catch((err) => {
        console.error(`Failed to load component: ${page}`, err);
        // Fallback component if the page doesn't exist
        return {
          default: () => (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h1>Service Not Found</h1>
              <p>The service page "{page}" could not be loaded.</p>
              <a href="/services">← Back to Services</a>
            </div>
          ),
        };
      }),
    {
      ssr: false,
      loading: () => (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading service details...</p>
        </div>
      ),
    }
  );

  return (
    <div className={styles.detailsPage}>
      <SideNav setSidebarOpen={setIsSidebarOpen} />
      <div
        className={`${styles.rightPanel} ${
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <CodeSampleModal />
      </div>
    </div>
  );
}
