'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CriarPedidoPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  
  const [clienteId, setClienteId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itensPedido, setItemsPedido] = useState([]);

  useEffect(() => {
    fetch('https://stock.dev.vilhena.ifro.edu.br/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(() => {});

    fetch('https://stock.dev.vilhena.ifro.edu.br/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(() => {});
  }, []);

  const adicionarItem = () => {
    if (!produtoId || quantidade < 1) {
      alert('Selecione um produto e uma quantidade válida.');
      return;
    }

    const prodObj = produtos.find(p => p.id == produtoId);
    if (!prodObj) return;

    setItemsPedido([
      ...itensPedido,
      { produto_id: produtoId, nome: prodObj.nome, quantidade: parseInt(quantidade) }
    ]);

    setProdutoId('');
    setQuantidade(1);
  };

  const enviarPedido = async (e) => {
    e.preventDefault();

    if (!clienteId) {
      alert('Selecione um cliente.');
      return;
    }

    if (itensPedido.length === 0) {
      alert('Adicione pelo menos um item ao pedido.');
      return;
    }

    const payload = {
      cliente_id: clienteId,
      itens: itensPedido.map(i => ({ produto_id: i.produto_id, quantidade: i.quantidade }))
    };

    try {
      const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Pedido criado com sucesso!');
        router.push('/pedidos');
      } else {
        alert('Erro ao criar pedido.');
      }
    } catch (err) {
      alert('Erro de conexão.');
    }
  };

  return (
    <div>
      <h1>Criar Novo Pedido</h1>
      <div className="cartao">
        <form onSubmit={enviarPedido}>
          <div className="formulario-grupo">
            <label>Cliente</label>
            <select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
              <option value="">Selecione um cliente...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <hr style={{ margin: '16px 0', border: '0', borderTop: '1px solid #ddd' }} />

          <h3>Adicionar Produtos</h3>
          <div className="formulario-grupo" style={{ marginTop: '10px' }}>
            <label>Produto</label>
            <select value={produtoId} onChange={e => setProdutoId(e.target.value)}>
              <option value="">Selecione um produto...</option>
              {produtos.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="formulario-grupo">
            <label>Quantidade</label>
            <input type="number" min="1" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
          </div>

          <button type="button" onClick={adicionarItem} style={{ background: '#555' }}>
            Adicionar Item
          </button>

          <div style={{ marginTop: '16px' }}>
            <h4>Itens adicionados:</h4>
            {itensPedido.length === 0 ? (
              <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '4px' }}>Nenhum item na lista.</p>
            ) : (
              <ul style={{ marginTop: '6px', paddingLeft: '20px' }}>
                {itensPedido.map((item, index) => (
                  <li key={index}>{item.nome} - Qtd: {item.quantidade}</li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" style={{ marginTop: '16px', width: '100%' }}>
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}