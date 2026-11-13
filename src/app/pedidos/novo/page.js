'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = 'https://stock.dev.vilhena.ifro.edu.br/api';

export default function CriarPedidoPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itensPedido, setItensPedido] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const respostaClientes = await fetch(`${API_URL}/clientes`);
        const respostaProdutos = await fetch(`${API_URL}/produtos`);

        if (!respostaClientes.ok || !respostaProdutos.ok) {
          throw new Error('Não foi possível carregar os dados.');
        }

        const dadosClientes = await respostaClientes.json();
        const dadosProdutos = await respostaProdutos.json();

        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function adicionarItem() {
    const produto = produtos.find((item) => Number(item.id) === Number(produtoId));
    const quantidadeNova = Number(quantidade);

    if (!produto) {
      setErro('Selecione um produto.');
      return;
    }

    if (quantidadeNova < 1 || !Number.isInteger(quantidadeNova)) {
      setErro('Informe uma quantidade inteira maior que zero.');
      return;
    }

    const itemExistente = itensPedido.find((item) => Number(item.produto_id) === Number(produto.id));
    let quantidadeTotal = quantidadeNova;

    if (itemExistente) {
      quantidadeTotal = itemExistente.quantidade + quantidadeNova;
    }

    if (quantidadeTotal > Number(produto.quantidade_estoque)) {
      setErro('A quantidade solicitada não está disponível no estoque.');
      return;
    }

    if (itemExistente) {
      const listaAtualizada = itensPedido.map((item) => {
        if (Number(item.produto_id) === Number(produto.id)) {
          return { ...item, quantidade: quantidadeTotal };
        }

        return item;
      });

      setItensPedido(listaAtualizada);
    } else {
      setItensPedido([...itensPedido, {
        produto_id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        quantidade: quantidadeNova,
      }]);
    }

    setProdutoId('');
    setQuantidade(1);
    setErro('');
  }

  function removerItem(id) {
    setItensPedido(itensPedido.filter((item) => Number(item.produto_id) !== Number(id)));
  }

  async function enviarPedido(event) {
    event.preventDefault();
    setErro('');

    if (!clienteId) {
      setErro('Selecione um cliente.');
      return;
    }

    if (itensPedido.length === 0) {
      setErro('Adicione pelo menos um item ao pedido.');
      return;
    }

    setEnviando(true);

    try {
      const respostaPedido = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id: Number(clienteId) }),
      });

      const pedido = await respostaPedido.json();

      if (!respostaPedido.ok) {
        throw new Error(pedido.erro || pedido.message || 'Erro ao criar pedido.');
      }

      if (!pedido.id) {
        throw new Error('A API não retornou o número do pedido.');
      }

      for (const item of itensPedido) {
        const respostaItem = await fetch(`${API_URL}/itens_pedido`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedido_id: pedido.id,
            produto_id: item.produto_id,
            quantidade: item.quantidade,
            preco_unitario: item.preco,
          }),
        });

        if (!respostaItem.ok) {
          throw new Error('Erro ao adicionar produto ao pedido.');
        }
      }

      alert('Pedido criado com sucesso!');
      router.push('/pedidos');
    } catch (error) {
      setErro(error.message);
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return <div className="cartao">Carregando clientes e produtos...</div>;
  }

  return (
    <section>
      <h1>Criar novo pedido</h1>

      <div className="cartao">
        <form onSubmit={enviarPedido}>
          {erro && <div className="erro mensagem-formulario">{erro}</div>}

          <div className="formulario-grupo">
            <label htmlFor="cliente">Cliente</label>
            <select
              id="cliente"
              value={clienteId}
              onChange={(event) => setClienteId(event.target.value)}
              required
            >
              <option value="">Selecione um cliente...</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
          </div>

          <hr className="separador" />
          <h2>Adicionar produtos</h2>

          <div className="formulario-linha">
            <div className="formulario-grupo">
              <label htmlFor="produto">Produto</label>
              <select
                id="produto"
                value={produtoId}
                onChange={(event) => setProdutoId(event.target.value)}
              >
                <option value="">Selecione um produto...</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} (estoque: {produto.quantidade_estoque})
                  </option>
                ))}
              </select>
            </div>

            <div className="formulario-grupo">
              <label htmlFor="quantidade">Quantidade</label>
              <input
                id="quantidade"
                type="number"
                min="1"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
              />
            </div>

            <button type="button" className="botao-secundario" onClick={adicionarItem}>
              Adicionar item
            </button>
          </div>

          <div className="itens-formulario">
            <h3>Itens adicionados</h3>

            {itensPedido.length === 0 ? (
              <p>Nenhum item adicionado.</p>
            ) : (
              <ul>
                {itensPedido.map((item) => (
                  <li key={item.produto_id}>
                    <span>
                      {item.nome} — {item.quantidade} × R$ {item.preco.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="botao-remover"
                      onClick={() => removerItem(item.produto_id)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" disabled={enviando} className="botao-enviar">
            {enviando ? 'Salvando pedido...' : 'Finalizar pedido'}
          </button>
        </form>
      </div>
    </section>
  );
}
