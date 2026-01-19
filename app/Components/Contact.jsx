import styles from './contact.module.css'
import Link from 'next/link';


export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className={styles.contactCont}>
        <h2>تواصل معنا</h2>

        <div className={styles.info}>
          <p>
            <span className={styles.label}>مواعيد العمل: </span>
            يوميًا من 12 ظهرًا – 2 صباحًا
          </p>
          <p>
            <span className={styles.label}>العنوان: </span>
            أعلى كنتاكي شارع سعد زغلول مركز, El-Hariry, Zagazig 1, Al-Sharqia Governorate
          </p>

        </div>

        <div className={styles.btns}>
        <Link
          href="https://maps.app.goo.gl/h88rkxE7ShHrjK616"
          target="_blank"
          className={styles.mapBtn}
        >
          لوكيشن المطعم
        </Link>

        <Link
          href="https://wa.me/201550039331"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          واتساب
        </Link>

        <Link
          href="tel:01550039331"
          className={styles.callBtn}
        >
          اتصل بنا
        </Link>
        </div>

        <p className={styles.footer}>
          © {new Date().getFullYear()} Paradise Restaurant
        </p>
      </div>
    </section>
  );
}
