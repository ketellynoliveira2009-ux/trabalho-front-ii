'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import estilos from './Header.module.css';

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.containerLogo}>
        <Link href="/" onClick={fecharMenu} className={estilos.linkLogo}>
          <Image 
            src="/iceSkate.png" 
            alt="Ícone Patinação Artística" 
            width={32} 
            height={32} 
            priority
          />
          <span className={estilos.textoLogo}>Patinação Artística</span>
        </Link>
      </div>

      <button 
        className={estilos.botaoHamburger} 
        onClick={alternarMenu}
        aria-label="Abrir menu de navegação"
      >
        <span className={estilos.linhaHamburger}></span>
        <span className={estilos.linhaHamburger}></span>
        <span className={estilos.linhaHamburger}></span>
      </button>

      <nav className={`${estilos.navegacao} ${menuAberto ? estilos.menuAberto : ''}`}>
        <ul className={estilos.listaMenu}>
          <li>
            <Link href="/" className={estilos.linkMenu} onClick={fecharMenu}>
              Início
            </Link>
          </li>
          <li>
            <Link href="/historia" className={estilos.linkMenu} onClick={fecharMenu}>
              História
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}