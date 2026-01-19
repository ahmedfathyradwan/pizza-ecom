import { useState } from 'react';
import styles from '../../(shop)/cart/cart.module.css';
export default function VisaModal({ isOpen, onClose, totalAmount, onPaymentSuccess }) {
    const [visaData, setVisaData] = useState({
        cardNumber: "",
        cvv: "",
        expiry: "",
    });

    const handleVisaPayment = async (e) => {
        e.preventDefault();

        // التحقق من البيانات
        if (!visaData.cardNumber || visaData.cardNumber.length < 16) {
            window.alert("❌ رقم البطاقة غير صحيح (يجب أن يكون 16 رقم)");
            return;
        }

        if (!visaData.cvv || visaData.cvv.length !== 3) {
            window.alert("❌ CVV غير صحيح (يجب أن يكون 3 أرقام)");
            return;
        }

        if (!visaData.expiry || !visaData.expiry.includes('/')) {
            window.alert("❌ تاريخ الانتهاء غير صحيح (MM/YY)");
            return;
        }

        // محاكاة عملية الدفع
        window.alert("⏳ جاري معالجة الدفع...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        // استدعاء دالة النجاح بعد الدفع
        const last4 = visaData.cardNumber.slice(-4);
        onPaymentSuccess(last4);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>الدفع بالبطاقة</h2>
                <form onSubmit={handleVisaPayment}>
                    <div className={styles.formGroup}>
                        <label>رقم البطاقة</label>
                        <input
                            type="text"
                            maxLength="16"
                            placeholder="1234 5678 1234 5678"
                            value={visaData.cardNumber}
                            onChange={(e) => setVisaData({ ...visaData, cardNumber: e.target.value.replace(/\D/g, '') })}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label>CVV</label>
                            <input
                                type="text"
                                maxLength="3"
                                placeholder="123"
                                value={visaData.cvv}
                                onChange={(e) => setVisaData({ ...visaData, cvv: e.target.value.replace(/\D/g, '') })}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>تاريخ الانتهاء</label>
                            <input
                                type="text"
                                maxLength="5"
                                placeholder="MM/YY"
                                value={visaData.expiry}
                                onChange={(e) => {
                                    let val = e.target.value.replace(/\D/g, '');
                                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                                    setVisaData({ ...visaData, expiry: val });
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <button type="button" className={styles.backBtn} onClick={onClose}>
                            إلغاء
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            دفع {totalAmount.toFixed(2)} جنيه
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
