import "../globals.css";
import Navbar from "../Components/Navbar";
import styles from "../page.module.css";
import { CartProvider } from "../context/CartContext";

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      <div className={styles.mainCont} >
        <Navbar className={styles.navbar} />
        {/* <h5 className={styles.decorText}>PARADISE</h5> */}
        {children}
      </div>
    </CartProvider>
  );
}
