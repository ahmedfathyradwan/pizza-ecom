import styles from '../../(shop)/cart/cart.module.css';
export default function CheckoutForm({ orderData, setOrderData, onSubmit, onCancel, submitLoading }) {
    // دالة مساعدة لتحديث البيانات
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.checkoutContainer}>
            <h2>إتمام الطلب</h2>

            <form onSubmit={onSubmit} className={styles.checkoutForm}>
                <div className={styles.formGroup}>
                    <label>الاسم الكامل</label>
                    <input
                        type="text"
                        name="name"
                        value={orderData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك ثنائي"
                        required
                        maxLength={25}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>رقم الهاتف</label>
                    <input
                        type="tel"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleChange}
                        placeholder="01xxxxxxxxx"
                        required
                        maxLength={11}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>عنوان التوصيل</label>
                    <textarea
                        name="address"
                        value={orderData.address}
                        onChange={handleChange}
                        placeholder="أدخل عنوان التوصيل بالتفصيل"
                        rows="3"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>ملاحظات إضافية (اختياري)</label>
                    <textarea
                        name="notes"
                        value={orderData.notes}
                        onChange={handleChange}
                        // placeholder="أي تفاصيل إضافية للطلب؟ (مثال: بدون بصل، زيادة كاتشب...)"
                        rows="2"
                    />
                </div>

                <div className={styles.formGroup}>
                    <h3 className={styles.formGroupTitle}>طريقة الدفع</h3>
                    <div className={styles.paymentMethods}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={orderData.paymentMethod === 'cash'}
                                onChange={handleChange}
                            />
                            <h4 className={styles.radioLabelH4}>نقدي عند التوصيل</h4>
                        </label>

                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="visa"
                                checked={orderData.paymentMethod === 'visa'}
                                onChange={handleChange}
                            />
                            <h4>دفع بالفيزا</h4>
                        </label>
                    </div>
                </div>

                <div className={styles.checkoutActions}>
                    <button type="button" className={styles.backBtn} onClick={onCancel}>
                        رجوع للسلة
                    </button>
                    <button type="submit" className={styles.submitBtn} disabled={submitLoading}>
                        {submitLoading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
                    </button>
                </div>
            </form>
        </div>
    );
}
