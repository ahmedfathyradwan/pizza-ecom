"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        // Auto redirect since auth is removed
        router.push("/dashboard");
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>جاري الدخول إلى لوحة التحكم...</h2>
                <p style={{ textAlign: "center", marginTop: "20px" }}>يتم تحويلك الآن.</p>
            </div>
        </div>
    );
}
