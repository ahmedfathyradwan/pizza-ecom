"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./category.module.css";
import { menuData } from "../../../data/menuData";
import { extrasData } from "../../../data/extrasData";
import ExtrasModal from "../../../Components/ExtrasModal";
import { useCart } from "../../../context/CartContext";

const categoryNames = {
  pizza: "البيتزا",
  pasta: "المكرونة",
  appetizers: "المقبلات",
  desserts: "الحلويات",
  drinks: "المشروبات",
};

// 🔹 دالة موحدة لتحديد المقاس الافتراضي
const getDefaultSize = (item, sizes) => {
  return sizes[item.id] || (item.prices.M ? "M" : Object.keys(item.prices)[0]);
};

export default function MenuCategoryPage() {
  const params = useParams();
  const category = params.category;
  const { addItem } = useCart();

  const filteredItems = menuData.filter(
    (item) => item.category === category
  );

  // STATES
  const [sizes, setSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const [addons, setAddons] = useState({});
  const [showAddons, setShowAddons] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const getQuantity = (itemId) => quantities[itemId] || 1;

  const increaseQty = (itemId) =>
    setQuantities((prev) => ({
      ...prev,
      [itemId]: getQuantity(itemId) + 1,
    }));

  const decreaseQty = (itemId) =>
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, getQuantity(itemId) - 1),
    }));

  const handleSizeChange = (itemId, size) =>
    setSizes((prev) => ({ ...prev, [itemId]: size }));

  const handleOpenAddons = (item) => {
    setCurrentItem(item);
    setShowAddons(true);
  };

  const handleConfirmAddons = (selected) => {
    if (!currentItem) return;

    setAddons((prev) => ({
      ...prev,
      [currentItem.id]: selected,
    }));

    setShowAddons(false);
    setCurrentItem(null);
  };

  const addToCart = (item) => {
    if (!item) return;

    const itemSize = getDefaultSize(item, sizes);
    const itemQty = getQuantity(item.id);
    const itemAddons = addons[item.id] || [];

    if (!item.prices[itemSize]) {
      console.error("الحجم غير موجود:", itemSize);
      return;
    }

    const payload = {
      pizzaId: item.id,
      title: item.title,
      image: item.image,
      size: itemSize,
      quantity: itemQty,
      addons: itemAddons,
      basePrice: item.prices[itemSize],
    };

    console.log("إضافة للسلة (local):", payload);
    addItem(payload);
    // تفريغ الإضافات المختارة لهذا المنتج بعد الإضافة
    setAddons((prev) => ({ ...prev, [item.id]: [] }));
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        ركن {categoryNames[category] || category}
      </h1>

      <div className={styles.flexContainer}>
        {filteredItems.map((item) => {
          const itemSize = getDefaultSize(item, sizes);
          const itemQty = getQuantity(item.id);

          return (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.sizesAndQuantity}>
                {/* SIZES */}
                <div className={styles.sizes}>
                  {Object.keys(item.prices).map((s) => (
                    <button
                      key={s}
                      className={`${styles.sizeBtn} ${
                        itemSize === s ? styles.active : ""
                      }`}
                      onClick={() => handleSizeChange(item.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* QUANTITY */}
                <div className={styles.quantity}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{itemQty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
              
              <div className={styles.price}>
  <span className={styles.amount}>
    {item.prices[itemSize] * itemQty}
  </span>
  <span className={styles.currency}>EGP</span>
</div>

              {/* FOOTER */}
              <div className={styles.footer}>
                <button
                  className={styles.addonsBtn}
                  onClick={() => handleOpenAddons(item)}
                >
                  الإضافات
                </button>

                <button
                  className={styles.addBtn}
                  onClick={() => addToCart(item)}
                >
                  إضافة للسلة
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EXTRAS MODAL */}
      {showAddons && currentItem && (
        <ExtrasModal
          extras={extrasData}
          onClose={() => setShowAddons(false)}
          onConfirm={handleConfirmAddons}
        />
      )}
    </section>
  );
}
