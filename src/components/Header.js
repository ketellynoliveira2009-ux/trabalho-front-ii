'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/categorias', label: 'Categorias' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/pedidos', label: 'Listar pedidos' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() { setMenuAberto(false); }
  function linkAtivo(href) { return href === '/' ? pathname === '/' : pathname.startsWith(href); }

  return (
    <header className={styles.cabecalho}>
      <div className={styles.barra}>
        <Link href="/" className={styles.marca} onClick={fecharMenu}>
          <span className={styles.marcaIcone} aria-hidden="true">EF</span>
          <span><strong>Controle de Estoque</strong><small>ESTOQUE FÁCIL</small></span>
        </Link>
        <button type="button" className={styles.botaoMenu} aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuAberto} onClick={() => setMenuAberto((aberto) => !aberto)}>
          {menuAberto ? '×' : '☰'}
        </button>
        <nav className={`${styles.navegacao} ${menuAberto ? styles.aberta : ''}`} aria-label="Navegação principal">
          {links.map((link) => <Link key={link.href} href={link.href} className={`${styles.link} ${linkAtivo(link.href) ? styles.ativo : ''}`} onClick={fecharMenu}>{link.label}</Link>)}
          <Link href="/pedidos/novo" className={styles.botaoNovo} onClick={fecharMenu}>Criar pedido</Link>
        </nav>
      </div>
    </header>
  );
}
