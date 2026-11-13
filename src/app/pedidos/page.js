'use client';

import { useEffect, useState } from 'react';
const API_URL = 'https://stock.dev.vilhena.ifro.edu.br/api';

async function consultar(recurso) {
  const resposta = await fetch(`${API_URL}/${recurso}`, { cache: 'no-store' });
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) throw new Error(dados?.erro || dados?.message || `Erro ${resposta.status}`);
  return dados;
}

function formatarData(data) {
  if (!data) return '—';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(data));
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [estado, setEstado] = useState('carregando');
  const [erro, setErro] = useState('');

  useEffect(() => {
    Promise.all([consultar('pedidos'), consultar('clientes'), consultar('produtos'), consultar('itens_pedido')])
      .then(([dadosPedidos, dadosClientes, dadosProdutos, dadosItens]) => {
        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
        setItens(Array.isArray(dadosItens) ? dadosItens : []);
        setEstado('pronto');
      })
      .catch((error) => { setErro(error.message); setEstado('erro'); });
  }, []);

  const mapaClientes = Object.fromEntries(clientes.map((cliente) => [cliente.id, cliente.nome]));
  const mapaProdutos = Object.fromEntries(produtos.map((produto) => [produto.id, produto.nome]));

  return (
    <section>
      <h1>Pedidos cadastrados</h1>
      {estado === 'carregando' && <div className="cartao">Carregando pedidos...</div>}
      {estado === 'erro' && <div className="cartao erro" role="alert">Não foi possível carregar os pedidos: {erro}</div>}
      {estado === 'pronto' && pedidos.length === 0 && <div className="cartao">Nenhum pedido cadastrado.</div>}
      {estado === 'pronto' && pedidos.map((pedido) => {
        const itensDoPedido = itens.filter((item) => {
          const idPedidoItem = item.pedido_id ?? item.pedido_numero ?? item.id_pedido ?? item.pedido?.id;
          return Number(idPedidoItem) === Number(pedido.id);
        });
        return <article key={pedido.id} className="cartao pedido-card">
          <div className="pedido-cabecalho"><h2>Pedido #{pedido.id}</h2><span className="status-pedido">{pedido.status || 'pendente'}</span></div>
          <p><strong>Cliente:</strong> {mapaClientes[pedido.cliente_id] || `Cliente #${pedido.cliente_id}`}</p>
          <p><strong>Data:</strong> {formatarData(pedido.data_pedido)}</p>
          <div className="pedido-itens"><strong>Itens:</strong>
            {itensDoPedido.length === 0 ? <span> Nenhum item encontrado.</span> : <ul>{itensDoPedido.map((item) => <li key={item.id}>{mapaProdutos[item.produto_id] || `Produto #${item.produto_id}`} — quantidade: {item.quantidade}</li>)}</ul>}
          </div>
        </article>;
      })}
    </section>
  );
}
