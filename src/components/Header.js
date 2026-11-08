'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';

const links = [
    { href: '/', label: 'Início', icone: '⌂' },
    { href: '/categorias', label: 'Categorias', icone: '▦' },
    { href: '/produtos', label: 'Produtos', icone: '□' },
    { href: '/clientes', label: 'Clientes', icone: '♙' },
    { href: '/pedidos', label: 'Pedidos', icone: '▤' },
];

export default function Header() {
    const [aberto, setAberto] = useState(false);
    const caminho = usePathname();

    return (
        <header className={styles.cabecalho}>
            <div className={styles.barra}>
                <Link href="/" className={styles.marca} onClick={() => setAberto(false)}>
                    <span className={styles.marcaIcone}>EF</span>
                    <span><strong>Estoque</strong><small>FÁCIL</small></span>
                </Link>
                <button className={styles.botaoMenu} onClick={() => setAberto(!aberto)} aria-label="Abrir menu">{aberto ? '×' : '☰'}</button>
                <nav className={`${styles.navegacao} ${aberto ? styles.aberta : ''}`}>
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className={`${styles.link} ${caminho === link.href || (link.href !== '/' && caminho.startsWith(link.href)) ? styles.ativo : ''}`} onClick={() => setAberto(false)}>
                            <span>{link.icone}</span>{link.label}
                        </Link>
                    ))}
                    <Link href="/pedidos/novo" className={styles.botaoNovo} onClick={() => setAberto(false)}>+ Novo pedido</Link>
                </nav>
            </div>
        </header>
    );
}
