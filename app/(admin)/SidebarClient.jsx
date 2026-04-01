"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminLayout.module.css";

export default function Sidebar() {
    const pathname = usePathname();
    const hideSidebar = pathname === "/dashboard/login";

    if (hideSidebar) return null;

    return (
        <aside className={styles.sidebar}>
            {/* <h2 className={styles.title}>لوحة التحكم</h2> */}
                <Link href="/dashboard" className={styles.link}>
                     نظرة عامة
                </Link>
                <Link href="/dashboard/products" className={styles.link}>
                    المنتجات
                </Link>
                <Link href="/dashboard/orders" className={styles.link}>
                     الطلبات
                </Link>
                <Link href="/" className={styles.back}>
                     العودة للمتجر
                </Link>
        </aside>
    );
}
