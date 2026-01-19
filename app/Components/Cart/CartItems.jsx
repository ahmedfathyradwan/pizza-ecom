import styles from '../../(shop)/cart/cart.module.css';
import Image from 'next/image';

export default function CartItems({ items, updateQuantity, removeItem }) {
    if (!items || items.length === 0) return null;

    return (
        <div className={styles.items}>
            {items.map((item) => (
                <div key={item.id} className={styles.item}>
                    {/* الصورة */}
                    {item.image && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={item.image || "/placeholder.png"}
                                alt={item.title || "منتج"}
                                width={80}
                                height={80}
                                className={styles.image}
                                unoptimized={item.image?.startsWith("http")}
                            />
                        </div>
                    )}

                    {/* التفاصيل */}
                    <div className={styles.info}>
                        <div className={styles.infoText}>
                        <h3>{item.title}</h3>
                        <span className={styles.size}>
                            Size: {item.size === 'small' || item.size === 'S' ? 'Small' : item.size === 'medium' || item.size === 'M' ? 'Medium' : item.size === 'large' || item.size === 'L' ? 'Large' : item.size || 'عادي'}
                        </span>
                        </div>

                        {/* الإضافات */}
                        {item.addons && item.addons.length > 0 && (
                            <div className={styles.addons}>
                                <strong>الإضافات:</strong>
                                <ul>
                                    {item.addons.map((addon, index) => (
                                        <li key={index}>+ {addon.name} ({addon.price} ج.م)</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* الكمية */}
                    <div className={styles.quantity}>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={styles.quantityBtn}
                        >
                            -
                        </button>
                        <button className={styles.quantityNum}>{item.quantity}</button>
                        <button className={styles.quantityBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                        </button>
                    </div>

                    <div className={styles.footerItem}>
                                            {/* السعر */}
                    <div className={styles.price}>
                        {item.totalPrice} جنيه
                    </div>

                    {/* زر الحذف */}
                    <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                    >
                        حذف
                    </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
