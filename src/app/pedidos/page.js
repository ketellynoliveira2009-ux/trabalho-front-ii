'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { consultar, formatarData } from '../../lib/api';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]); const [clientes, setClientes] = useState([]); const [estado, setEstado] = useState('carregando'); const [erro, setErro] = useState('');
  useEffect(() => { Promise.all([consultar('pedidos'), consultar('clientes')]).then(([lista, pessoas]) => { setPedidos(lista); setClientes(pessoas); setEstado('pronto'); }).catch((e) => { setErro(e.message); setEstado('erro'); }); }, []);
  const nomeCliente = (id) => clientes.find((cliente) => cliente.id === id)?.nome || `Cliente #${id}`;
  return <section className="container"><div className="cabecalho-pagina"><div><span className="eyebrow">Operação</span><h1>Pedidos</h1><p>Acompanhe todos os pedidos registrados no estoque.</p></div><Link href="/pedidos/novo" className="botao">+ Novo pedido</Link></div><div className="card tabela-wrap">{estado === 'carregando' && <div className="carregando">Carregando pedidos da API...</div>}{estado === 'erro' && <div className="erro">{erro}</div>}{estado === 'pronto' && <table className="tabela"><thead><tr><th>Pedido</th><th>Cliente</th><th>Data</th><th>Status</th></tr></thead><tbody>{pedidos.map((pedido) => <tr key={pedido.id}><td><strong>#{String(pedido.id).padStart(4, '0')}</strong></td><td>{nomeCliente(pedido.cliente_id)}</td><td>{formatarData(pedido.data_pedido)}</td><td><span className={`status status-${pedido.status}`}>{pedido.status}</span></td></tr>)}</tbody></table>}</div></section>;
}
