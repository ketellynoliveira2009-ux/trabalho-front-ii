'use client';

import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();

  const getManeuvers = () => {
    if (pathname === '/feminino') {
      return ['Axle Triplo', 'Salchow Quádruplo', 'Pirueta Biellmann', 'Sequência de Espirais'];
    }
    if (pathname === '/masculino') {
      return ['Quad Toe Loop', 'Triple Axel', 'Quad Lutz', 'Pirueta Sentada Avançada'];
    }
    if (pathname === '/par') {
      return ['Death Spiral (Espiral da Morte)', 'Throw Jump (Salto Arremessado)', 'Lift (Elevação acrobática)', 'Espelho Sincronizado'];
    }
    return ['Axle', 'Salchow', 'Pirueta', 'Espiral'];
  };

  const maneuvers = getManeuvers();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.maneuversSection}>
          <h4 className={styles.title}>Principais Manobras da Modalidade:</h4>
          <ul className={styles.list}>
            {maneuvers.map((maneuver, index) => (
              <li key={index} className={styles.item}>{maneuver}</li>
            ))}
          </ul>
        </div>
        <p className={styles.copy}>&copy; 2026 IceArt - Patinação Artística. Desenvolvido por Llyn.</p>
      </div>
    </footer>
  );
}