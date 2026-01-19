import styles from '../../(shop)/cart/cart.module.css';
export default function CartSummary({ total, deliveryFee, onClearCart, onCheckout, showCheckout }) {
    return (
        <div  className={styles.summaryCont}>
            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <strong>المجموع الفرعي:</strong>
                    <strong>{total.toFixed(2)} جنيه</strong>
                </div>
                <div className={styles.summaryRow}>
                    <strong>رسوم التوصيل:</strong>
                    <strong>{deliveryFee} جنيه</strong>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <strong>الإجمالي:</strong>
                    <strong>{(total + deliveryFee).toFixed(2)} جنيه</strong>
                </div>
            </div>

            {!showCheckout && (
                <div className={styles.actions}>
                    <button className={styles.clearBtn} onClick={onClearCart}>
                        تفريغ السلة
                    </button>
                    <button className={styles.checkout} onClick={onCheckout}>
                        إتمام الطلب
                    </button>
                </div>
            )}
        </div>
    );
}
