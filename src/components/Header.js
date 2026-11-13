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
  { href: '/pedidos', label: 'Pedidos' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={styles.cabecalho}>
      <div className={styles.barra}>
        <Link href="/" className={styles.marca} onClick={() => setMenuAberto(false)}>
          Controle de Estoque
        </Link>

        <button
          type="button"
          className={styles.botaoMenu}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? '×' : '☰'}
        </button>

        <nav
          className={`${styles.navegacao} ${menuAberto ? styles.aberta : ''
            }`}
          aria-label="Navegação principal"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${(link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? styles.ativo : ''}`}
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/pedidos/novo"
            className={styles.botaoNovo}
            onClick={() => setMenuAberto(false)}
          >
            Criar pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
