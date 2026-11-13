'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const API_URL = 'https://stock.dev.vilhena.ifro.edu.br/api';

async function consultar(recurso) {
  const resposta = await fetch(`${API_URL}/${recurso}`, { cache: 'no-store' });
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    const mensagem = dados?.erro || dados?.message || dados?.erros?.[0]?.message || dados?.erros?.[0] || `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }
  return dados;
}

async function enviar(recurso, method, body) {
  const resposta = await fetch(`${API_URL}/${recurso}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    const mensagem = dados?.erro || dados?.message || dados?.erros?.[0]?.message || dados?.erros?.[0] || `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }
  return dados;
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CriarPedidoPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState([]); const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState(''); const [produtoId, setProdutoId] = useState(''); const [quantidade, setQuantidade] = useState(1);
  const [itensPedido, setItensPedido] = useState([]); const [estado, setEstado] = useState('carregando'); const [enviando, setEnviando] = useState(false); const [erro, setErro] = useState('');

  useEffect(() => {
    Promise.all([consultar('clientes'), consultar('produtos')]).then(([dadosClientes, dadosProdutos]) => {
      setClientes(Array.isArray(dadosClientes) ? dadosClientes : []); setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []); setEstado('pronto');
    }).catch((error) => { setErro(error.message); setEstado('erro'); });
  }, []);

  function adicionarItem() {
    const produto = produtos.find((item) => Number(item.id) === Number(produtoId)); const quantidadeNumerica = Number(quantidade);
    if (!produto) { setErro('Selecione um produto.'); return; }
    if (!Number.isInteger(quantidadeNumerica) || quantidadeNumerica < 1) { setErro('Informe uma quantidade inteira maior que zero.'); return; }
    const itemExistente = itensPedido.find((item) => Number(item.produto_id) === Number(produto.id));
    const quantidadeTotal = (itemExistente?.quantidade || 0) + quantidadeNumerica;
    const estoque = Number(produto.quantidade_estoque);
    if (!Number.isFinite(estoque) || quantidadeTotal > estoque) {
      setErro(`A quantidade solicitada para "${produto.nome}" não está disponível no estoque.`);
      return;
    }
    setItensPedido((itensAtuais) => itemExistente ? itensAtuais.map((item) => item.produto_id === produto.id ? { ...item, quantidade: quantidadeTotal } : item) : [...itensAtuais, { produto_id: produto.id, nome: produto.nome, preco: Number(produto.preco), quantidade: quantidadeNumerica }]);
    setProdutoId(''); setQuantidade(1); setErro('');
  }

  function removerItem(id) { setItensPedido((itensAtuais) => itensAtuais.filter((item) => item.produto_id !== id)); }

  async function enviarPedido(event) {
    event.preventDefault(); setErro('');
    if (!clienteId) { setErro('Selecione um cliente.'); return; }
    if (itensPedido.length === 0) { setErro('Adicione pelo menos um item ao pedido.'); return; }
    setEnviando(true);
    try {
      // A API cria o pedido primeiro e aceita somente cliente_id neste endpoint.
      const pedidoCriado = await enviar('pedidos', 'POST', { cliente_id: Number(clienteId) }); const pedidoId = pedidoCriado?.id;
      if (!pedidoId) throw new Error('A API não retornou o id do pedido criado.');
      for (const item of itensPedido) {
        await enviar('itens_pedido', 'POST', {
          pedido_id: Number(pedidoId),
          produto_id: Number(item.produto_id),
          quantidade: Number(item.quantidade),
          preco_unitario: Number(item.preco),
        });
      }
      window.alert('Pedido criado com sucesso!'); router.push('/pedidos');
    } catch (error) { setErro(`Não foi possível criar o pedido: ${error.message}`); } finally { setEnviando(false); }
  }

  if (estado === 'carregando') return <div className="cartao">Carregando clientes e produtos...</div>;
  if (estado === 'erro') return <div className="cartao erro" role="alert">Não foi possível carregar o formulário: {erro}</div>;

  return <section><h1>Criar novo pedido</h1><div className="cartao"><form onSubmit={enviarPedido}>
    {erro && <div className="erro mensagem-formulario" role="alert">{erro}</div>}
    <div className="formulario-grupo"><label htmlFor="cliente">Cliente</label><select id="cliente" value={clienteId} onChange={(event) => setClienteId(event.target.value)} required><option value="">Selecione um cliente...</option>{clientes.map((cliente) => <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>)}</select></div>
    <hr className="separador" /><h2>Adicionar produtos</h2>
    <div className="formulario-linha"><div className="formulario-grupo"><label htmlFor="produto">Produto</label><select id="produto" value={produtoId} onChange={(event) => setProdutoId(event.target.value)}><option value="">Selecione um produto...</option>{produtos.map((produto) => <option key={produto.id} value={produto.id}>{produto.nome} (estoque: {produto.quantidade_estoque})</option>)}</select></div><div className="formulario-grupo"><label htmlFor="quantidade">Quantidade</label><input id="quantidade" type="number" min="1" value={quantidade} onChange={(event) => setQuantidade(event.target.value)} /></div><button type="button" className="botao-secundario" onClick={adicionarItem}>Adicionar item</button></div>
    <div className="itens-formulario"><h3>Itens adicionados</h3>{itensPedido.length === 0 ? <p>Nenhum item adicionado.</p> : <ul>{itensPedido.map((item) => <li key={item.produto_id}><span>{item.nome} — {item.quantidade} × {formatarMoeda(item.preco)}</span><button type="button" className="botao-remover" onClick={() => removerItem(item.produto_id)}>Remover</button></li>)}</ul>}</div>
    <button type="submit" disabled={enviando} className="botao-enviar">{enviando ? 'Salvando pedido...' : 'Finalizar pedido'}</button>
  </form></div></section>;
}
