'use client';

import { useState, useEffect } from 'react';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarDadosPedidos() {
      try {
        const [resPedidos, resClientes] = await Promise.all([
          fetch('https://stock.dev.vilhena.ifro.edu.br/api/pedidos', { cache: 'no-store' }).then(r => r.json()),
          fetch('https://stock.dev.vilhena.ifro.edu.br/api/clientes', { cache: 'no-store' }).then(r => r.json())
        ]);
        
        setPedidos(Array.isArray(resPedidos) ? resPedidos : []);
        setClientes(Array.isArray(resClientes) ? resClientes : []);
      } catch (err) {
        console.error('Erro ao buscar pedidos ou clientes:', err);
        setPedidos([]);
        setClientes([]);
      } finally {
        setCarregando(false);
      }
    }

    buscarDadosPedidos();
  }, []);

  const mapaClientes = {};
  clientes.forEach(c => { mapaClientes[c.id] = c.nome; });

  return (
    <div>
      <h1>Pedidos Cadastrados</h1>
      {carregando ? (
        <div className="cartao">
          <p>Carregando pedidos...</p>
        </div>
      ) : pedidos.length > 0 ? (
        pedidos.map(pedido => (
          <div key={pedido.id} className="cartao">
            <h3>Pedido #{pedido.id}</h3>
            <p style={{ marginTop: '6px' }}>
              <strong>Cliente:</strong> {mapaClientes[pedido.cliente_id] || `Cliente #${pedido.cliente_id}`}
            </p>
          </div>
        ))
      ) : (
        <div className="cartao">
          <p>Nenhum pedido cadastrado.</p>
        </div>
      )}
    </div>
  );
}