"use client";
import { useState } from "react";
import styles from "./OrdersPage.module.css";

export default function OrderList({ initialOrders }) {
    const [orders, setOrders] = useState(initialOrders);

    const handleStatusChange = async (id, newStatus) => {
        // Optimistic update
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));

        // Call API (TODO: Implement Update Order Status API)
        console.log(`Updating order ${id} to ${newStatus}`);
    };

    return (
        <div className={styles.orderList}>
            {orders.length === 0 && <p className={styles.noOrders}>لا توجد طلبات.</p>}
            {orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                        <h3 className={styles.orderId}>طلب #{order.id.slice(0, 8)}</h3>
                        <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                            {order.status === 'Pending' ? 'قيد الانتظار' :
                             order.status === 'Preparing' ? 'جاري التحضير' :
                             order.status === 'OutForDelivery' ? 'خرج للتوصيل' :
                             order.status === 'Delivered' ? 'تم التوصيل' :
                             order.status === 'Cancelled' ? 'ملغي' : order.status}
                        </span>
                    </div>

                    <div className={styles.orderDetails}>
                        <div>
                            <strong>العميل:</strong> {order.customerName}<br />
                            <strong>الهاتف:</strong> {order.phone}<br />
                            <strong>العنوان:</strong> {order.address}
                        </div>
                        <div>
                            <strong>الإجمالي:</strong> {order.totalAmount} ج.م<br />
                            <strong>ملاحظات:</strong> {order.notes || "لا يوجد"}
                        </div>
                    </div>

                    <div className={styles.statusUpdate}>
                        <label className={styles.statusLabel}>تحديث الحالة:</label>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={styles.statusSelect}
                        >
                            <option value="Pending">قيد الانتظار</option>
                            <option value="Preparing">جاري التحضير</option>
                            <option value="OutForDelivery">خرج للتوصيل</option>
                            <option value="Delivered">تم التوصيل</option>
                            <option value="Cancelled">ملغي</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
}
