"use client";

import { useState, useEffect } from "react";
import styles from "./cart.module.css";
import { useCart } from "../../context/CartContext";
import CartItems from "../../Components/Cart/CartItems";
import CartSummary from "../../Components/Cart/CartSummary";
import CheckoutForm from "../../Components/Cart/CheckoutForm";
import VisaModal from "../../Components/Cart/VisaModal";

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeItem, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showVisaModal, setShowVisaModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // بيانات الطلب
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  });

  const DELIVERY_FEE = 20;

  // مزامنة حالة الصفحة مع بيانات الـ Context
  useEffect(() => {
    setCartItems(items);
    setTotal(cartTotal);
    setLoading(false);
  }, [items, cartTotal]);

  // إرسال الطلب (بدء العملية)
  const HandleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!orderData.name || !orderData.phone || !orderData.address) {
      window.alert("❌ يرجى ملء جميع البيانات");
      return;
    }

    if (orderData.paymentMethod === 'visa') {
      setShowVisaModal(true);
      return;
    }

    await completeOrder();
  };

  // إتمام الطلب (بعد الفحص أو الدفع)
  const completeOrder = async (last4Digits = null) => {
    setSubmitLoading(true);
    const orderDetails = {
      ...orderData,
      items: cartItems,
      subtotal: total,
      deliveryFee: DELIVERY_FEE,
      total: total + DELIVERY_FEE,
      orderDate: new Date().toISOString(),
    };

    console.log("تفاصيل الطلب:", orderDetails);

    // رسالة النجاح
    let successMsg = `✅ تم استلام طلبك بنجاح!\n\nالإجمالي: ${orderDetails.total.toFixed(2)} جنيه`;
    if (last4Digits) {
      successMsg += `\nطريقة الدفع: فيزا(**** ${last4Digits})`;
    } else {
      successMsg += `\nطريقة الدفع: نقدي عند التوصيل`;
    }
    successMsg += `\n\nسيتم التواصل معك قريباً!`;

    window.alert(successMsg);

    // تفريغ السلة (محلياً)
    clearCart();

    setSubmitLoading(false);
    setShowCheckout(false);
    setShowVisaModal(false);
    setOrderData({ name: "", phone: "", address: "", paymentMethod: "cash" });
  };

  return (
    <main className={styles.cart}>
      {/* 1. Modal */}
      <VisaModal
        isOpen={showVisaModal}
        onClose={() => setShowVisaModal(false)}
        totalAmount={total + DELIVERY_FEE}
        onPaymentSuccess={(last4) => completeOrder(last4)}
      />

      {/* 2. Checkout or Cart View */}
      {showCheckout ? (
        <CheckoutForm
          orderData={orderData}
          setOrderData={setOrderData}
          onSubmit={HandleSubmitOrder}
          onCancel={() => setShowCheckout(false)}
          submitLoading={submitLoading}
        />
      ) : (
        <>
          <h2>عربة التسوق</h2>

          {cartItems.length === 0 ? (
            <p className={styles.empty}>عربة التسوق فارغة</p>
          ) : (
            <>
              {/* 3. Items List */}
              <CartItems
                items={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />

              {/* 4. Summary & Action Buttons */}
              <CartSummary
                total={total}
                deliveryFee={DELIVERY_FEE}
                onClearCart={clearCart}
                onCheckout={() => setShowCheckout(true)}
                showCheckout={showCheckout}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}
