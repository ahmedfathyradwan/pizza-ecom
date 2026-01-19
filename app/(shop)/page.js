"use client"
import styles from "../page.module.css";
import Menu from "../Components/Menu";
import About from "../Components/About";
import Contact from "../Components/Contact";
import Image from "next/image";
import Link from "next/link";
import CirclesLottie from "../Components/CirclesLottie"

export default function Home() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.hero}>
          <Image src="/1.png" width={60} height={60} alt="Decor" priority className={styles.decor1} />
          <Image src="/3.png" width={60} height={60} alt="Decor" priority className={styles.decor3} />
          <Image src="/2.png" width={50} height={50} alt="Decor" priority className={styles.decor4} />
          <Image src="/5.png" width={60} height={60} alt="Decor" priority className={styles.decor2} />

          <div className={styles.circle}>
            <CirclesLottie speed={0.01} />
          </div>

          <div className={styles.heroImg}>
            <Image src="/hero.png" width={300} height={300} alt="Pizza hero" priority />
          </div>
          <div className={styles.heroText}>
            <h3 className={styles.spa}>بيتزا</h3>
            <Link href="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
              <h1 className={styles.title}>باراديز</h1>
            </Link>
            <h3 className={styles.par}>بيتزا سخنة بعجينة طازة</h3>
            <div className={styles.btnsHero}>
              <Link href="/menu" className={styles.lin}>
                <button className={styles.btn}>اطلب دلوقتي</button>
              </Link>
              <a
                href="/menu.jpg"
                download="menu.jpg"
                className={styles.downloader}
              >
                تحميل المنيو
              </a>
            </div>
          </div>
        </div>
        <Menu />
        <About />
        <Contact />
      </div>
    </>
  );
}
