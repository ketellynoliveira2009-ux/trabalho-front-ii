import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Universo da Patinação Artística</h1>
      <p className={styles.subtitle}>
        Explore as modalidades olímpicas, conheça os grandes atletas e descubra as manobras mais impressionantes do gelo.
      </p>

      <div className={styles.grid}>
        <Link href="/feminino" className={styles.card}>
          <h2>Individual Feminina &rarr;</h2>
          <p>Elegância, saltos complexos e precisão artística individual.</p>
        </Link>
        <Link href="/masculino" className={styles.card}>
          <h2>Individual Masculina &rarr;</h2>
          <p>Força atlética, saltos quádruplos de alto risco e dinamismo.</p>
        </Link>
        <Link href="/par" className={styles.card}>
          <h2>Duplas / Par &rarr;</h2>
          <p>Sincronia perfeita, elevações acrobáticas e saltos arremessados.</p>
        </Link>
      </div>
    </div>
  );
}