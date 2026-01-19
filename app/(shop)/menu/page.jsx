"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../../Components/menu.module.css";
import menuCategories from "../../data/menuCategories";
import { IoIosArrowDropleft } from "react-icons/io";


export default function MenuPage() {
  return (
    <section className={styles.menuPreview}>
              <h2 className={styles.title}>منيو باراديز</h2>
              <h4 className={styles.disc}>اكتشف وجباتنا الشهية</h4>
      <div className={styles.menuCont}>
        {menuCategories.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className={styles.menuCard}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={180}
              height={180}
              className={styles.img}
            />
<div className={styles.cardCont}>
<h4 className={styles.categ}>{item.title}</h4>
<IoIosArrowDropleft className={styles.icon}/>
</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
