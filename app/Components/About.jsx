import styles from './about.module.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className={styles.aboutCont}>
      <h2>عن مطعمنا</h2>
      <p>
        في براديز بنحضر الأكل بحُب، وبنختار كل مكوّن بعناية،
      </p>
      <p>
        سواء هتاكل عندنا أو تطلب أونلاين،  هنوفرلك تجربة أكل مميزة.
      </p>
      </div>
    </section>
  );
}
