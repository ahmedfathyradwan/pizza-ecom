import styles from "./OffersSection.module.css";
import Image from "next/image";

const offers = [
    {
        id: 1,
        image: "/offer/1.jpg",
        title: "عرض البيتزا العائلية",
        description: "2 بيتزا حجم كبير + بطاطس + مشروب 1 لتر",
        price: "199 جنيه",
    },
    {
        id: 2,
        image: "/offer/2.jpg",
        title: "عرض باستا + مشروب",
        description: "طبق باستا اختيارك + مشروب غازي",
        price: "129 جنيه",
    },
    {
        id: 3,
        image: "/offer/3.jpg",
        title: "عرض الحلو",
        description: "قطعة تشيزكيك + صوص شوكولاتة",
        price: "79 جنيه",
    },
];


export default function OffersSection() {
    return (
        <section className={styles.offersSection}>
            <h2 className={styles.title}>عروض الشهر</h2>

            <div className={styles.slider}>
                {offers.map((offer) => (
                    <div key={offer.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={offer.image}
                                alt={offer.title}
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.overlay}>
                            <div className={styles.info}>
                                <p className={styles.offerTitle}>{offer.title}</p>

                                <p className={styles.description}>
                                    {offer.description}
                                </p>

                                <span className={styles.price}>{offer.price}</span>
                            </div>
                            <div className={styles.offerBtnCont}>
                                <span className={styles.offerBtn}>اطلب الآن</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
