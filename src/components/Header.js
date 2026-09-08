import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Cabecalho() {
    return (
        <header className={styles.headerPrincipal}>
            <div className={styles.logoContainer}>
                <Link href="/" className={styles.linkLogo}>
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

            <nav className={styles.navLinks}>
                <Link href="/">Início</Link>
                <Link href="/historia">História</Link>
            </nav>
        </header>
    );
}