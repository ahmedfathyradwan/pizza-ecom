import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>نظرة عامة</h1>

      <div className={styles.cardsGrid}>
        {/* إجمالي الطلبات */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>إجمالي الطلبات</h3>
          <p className={`${styles.cardValue} ${styles.orders}`}>0</p>
        </div>

        {/* إجمالي المبيعات */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>إجمالي المبيعات</h3>
          <p className={`${styles.cardValue} ${styles.sales}`}>0 ج.م</p>
        </div>

        {/* طلبات قيد الانتظار */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>طلبات قيد الانتظار</h3>
          <p className={`${styles.cardValue} ${styles.pending}`}>0</p>
        </div>
      </div>
    </div>
  );
}
