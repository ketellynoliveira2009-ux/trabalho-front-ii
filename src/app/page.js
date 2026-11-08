'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { consultar } from '../lib/api';
import styles from './page.module.css';

const integrantes = ['Nome do integrante 1', 'Nome do integrante 2'];

export default function Inicio() {
  const [dados, setDados] = useState({ produtos: [], clientes: [], pedidos: [], categorias: [] });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([consultar('produtos'), consultar('clientes'), consultar('pedidos'), consultar('categorias')])
      .then(([produtos, clientes, pedidos, categorias]) => setDados({ produtos, clientes, pedidos, categorias }))
      .finally(() => setCarregando(false));
  }, []);

  const pendentes = dados.pedidos.filter((pedido) => pedido.status === 'pendente').length;
  return (
    <section className="container">
      <div className={styles.hero}>
        <div><span className="eyebrow">Painel de controle</span><h1>Seu estoque,<br /><em>em ordem.</em></h1><p>Uma visão clara para acompanhar produtos, clientes e pedidos em um só lugar.</p><div className={styles.heroAcoes}><Link href="/pedidos/novo" className="botao">+ Criar pedido</Link><Link href="/pedidos" className="botao secundario">Ver pedidos →</Link></div></div>
        <div className={styles.heroArte}><span className={styles.circulo}></span><div className={styles.nota}><span>ESTOQUE</span><strong>{carregando ? '—' : `${dados.produtos.length} itens`}</strong><small>catálogo atualizado</small></div><div className={styles.grafico}><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      </div>
      <div className={styles.linhaTitulo}><div><span className="eyebrow">Resumo geral</span><h2>Visão rápida</h2></div><span className={styles.atualizado}>● Dados vindos da API</span></div>
      <div className={styles.indicadores}><Indicador titulo="Produtos" valor={dados.produtos.length} legenda="no catálogo" icone="□" cor="verde" /><Indicador titulo="Clientes" valor={dados.clientes.length} legenda="cadastrados" icone="♙" cor="azul" /><Indicador titulo="Pedidos" valor={dados.pedidos.length} legenda="no histórico" icone="▤" cor="amarelo" /><Indicador titulo="Pendentes" valor={pendentes} legenda="aguardando ação" icone="◷" cor="rosa" /></div>
      <div className={styles.acoesGrid}><Link href="/pedidos/novo" className={`${styles.acaoCard} card`}><span className={styles.acaoIcone}>＋</span><div><strong>Novo pedido</strong><small>Registre uma nova venda</small></div><span>→</span></Link><Link href="/produtos" className={`${styles.acaoCard} card`}><span className={styles.acaoIcone}>▧</span><div><strong>Ver catálogo</strong><small>Confira os produtos disponíveis</small></div><span>→</span></Link></div>
      <div className={styles.dupla}><span className="eyebrow">Desenvolvido por</span><h3>{integrantes.join(' & ')}</h3><p>Atividade de desenvolvimento Front-End • 4º bimestre</p></div>
    </section>
  );
}

function Indicador({ titulo, valor, legenda, icone, cor }) { return <div className={`${styles.indicador} card`}><span className={`${styles.indicadorIcone} ${styles[cor]}`}>{icone}</span><div><span>{titulo}</span><strong>{valor}</strong><small>{legenda}</small></div></div>; }
