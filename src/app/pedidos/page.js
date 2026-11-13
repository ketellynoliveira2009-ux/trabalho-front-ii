'use client';

import { useEffect, useState } from 'react';

const API_URL = 'https://stock.dev.vilhena.ifro.edu.br/api';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarDados() {
      try {
        const respostaPedidos = await fetch(`${API_URL}/pedidos`);
        const respostaClientes = await fetch(`${API_URL}/clientes`);
        const respostaProdutos = await fetch(`${API_URL}/produtos`);
        const respostaItens = await fetch(`${API_URL}/itens_pedido`);

        if (!respostaPedidos.ok || !respostaClientes.ok || !respostaProdutos.ok || !respostaItens.ok) {
          throw new Error('Erro ao buscar os dados.');
        }

        const dadosPedidos = await respostaPedidos.json();
        const dadosClientes = await respostaClientes.json();
        const dadosProdutos = await respostaProdutos.json();
        const dadosItens = await respostaItens.json();

        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
        setItens(Array.isArray(dadosItens) ? dadosItens : []);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, []);

  function formatarData(data) {
    if (!data) return '—';
    return new Date(data).toLocaleString('pt-BR');
  }

  return (
    <section>
      <h1>Pedidos cadastrados</h1>

      {carregando && <div className="cartao">Carregando pedidos...</div>}
      {erro && <div className="cartao erro">Não foi possível carregar os pedidos: {erro}</div>}

      {!carregando && !erro && pedidos.length === 0 && (
        <div className="cartao">Nenhum pedido cadastrado.</div>
      )}

      {!carregando && !erro && pedidos.map((pedido) => {
        const cliente = clientes.find((item) => Number(item.id) === Number(pedido.cliente_id));
        const itensDoPedido = itens.filter((item) => Number(item.pedido_id) === Number(pedido.id));

        return (
          <article key={pedido.id} className="cartao pedido-card">
            <div className="pedido-cabecalho">
              <h2>Pedido #{pedido.id}</h2>
              <span className="status-pedido">{pedido.status || 'pendente'}</span>
            </div>

            <p><strong>Cliente:</strong> {cliente ? cliente.nome : `Cliente #${pedido.cliente_id}`}</p>
            <p><strong>Data:</strong> {formatarData(pedido.data_pedido)}</p>

            <div className="pedido-itens">
              <strong>Itens:</strong>
              {itensDoPedido.length === 0 ? (
                <span> Nenhum item encontrado.</span>
              ) : (
                <ul>
                  {itensDoPedido.map((item) => {
                    const produto = produtos.find((produto) => Number(produto.id) === Number(item.produto_id));

                    return (
                      <li key={item.id}>
                        {produto ? produto.nome : `Produto #${item.produto_id}`}
                        {' — quantidade: '}{item.quantidade}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
