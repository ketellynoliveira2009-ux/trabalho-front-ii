'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer} onClick={closeMenu}>
          {/* Usando o componente Image do Next.js conforme requisito */}
          <Image 
            src="/next.svg" 
            alt="Logo Patinação" 
            width={35} 
            height={35} 
            className={styles.logoImage}
          />
          <span className={styles.logoText}>IceArt</span>
        </Link>

        {/* Botão Hambúrguer para telas menores que 600px */}
        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menu">
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`}></span>
        </button>

        {/* Menu de navegação */}
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <Link href="/feminino" className={styles.navLink} onClick={closeMenu}>
            Individual Feminina
          </Link>
          <Link href="/masculino" className={styles.navLink} onClick={closeMenu}>
            Individual Masculina
          </Link>
          <Link href="/par" className={styles.navLink} onClick={closeMenu}>
            Duplas / Par
          </Link>
        </nav>
      </div>
    </header>
  );
}