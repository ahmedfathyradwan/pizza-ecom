import Link from "next/link";
import styles from "./AdminLayout.module.css";
import Sidebar from "./SidebarClient";

export const metadata = {
    title: "Admin Dashboard | Paradise Pizza",
    description: "Restaurant Management Panel",
};

export default function AdminLayout({ children }) {
    return (
        <div className={styles.layout}>
            <Sidebar  className={styles.sidebar}/>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
