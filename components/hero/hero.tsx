import styles from "./hero.module.css";

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.srOnly}>Caseflow</h1>
      <div className={styles.gradientBar} />
    </div>
  );
}
