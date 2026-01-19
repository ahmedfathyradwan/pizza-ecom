"use client";
import { useState } from "react";
import styles from "./extras.module.css";

export default function ExtrasModal({
  extras = [],     // [{ id, name, price }]
  onClose,
  onConfirm,
}) {
  const [selected, setSelected] = useState([]);

  const toggleExtra = (extra) => {
    setSelected((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleConfirm = () => {
    onConfirm?.(selected);
    onClose?.();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>اختر الإضافات</h2>

        <div className={styles.extrasList}>
          {extras.length > 0 ? (
            extras.map((extra) => (
              <label key={extra.id} className={styles.extraItem}>
                <input
                  type="checkbox"
                  checked={selected.some((e) => e.id === extra.id)}
                  onChange={() => toggleExtra(extra)}
                />

                <span className={styles.name}>{extra.name}</span>

                <span className={styles.price}>+{extra.price} ج</span>
              </label>
            ))
          ) : (
            <p className={styles.empty}>لا توجد إضافات متاحة</p>
          )}
        </div>

        <div className={styles.actions}>
        <button onClick={onClose} className={styles.cancelBtn}>
            إلغاء
          </button>

          <button
            onClick={handleConfirm}
            className={styles.confirmBtn}
            disabled={extras.length === 0}
          >
            موافق
          </button>
        </div>
      </div>
    </div>
  );
}
