"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Cabecalho() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header className={styles.headerPrincipal}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <Image
                        src="/iceSkate.png"
                        alt="Ícone Patinação Artística"
                        width={32}
                        height={32}
                        priority
                    />
                </Link>
                <h3 className={styles.logoTexto}>Patinação Artística</h3>
            </div>

            {}
            <button 
                className={styles.botaoHamburguer} 
                onClick={() => setMenuAberto(!menuAberto)}
            >
                {menuAberto ? '✕' : '☰'}
            </button>

            {}
            <nav className={`${styles.navLinks} ${menuAberto ? styles.navAberto : ''}`}>
                <Link href="/" onClick={() => setMenuAberto(false)}>Início</Link>
                <Link href="/modalidades" onClick={() => setMenuAberto(false)}>Modalidades</Link>
                <Link href="/historia" onClick={() => setMenuAberto(false)}>História</Link>
            </nav>
        </header>
    );
}