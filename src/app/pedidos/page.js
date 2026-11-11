async function buscarDadosPedidos() {
  try {
    const [resPedidos, resClientes] = await Promise.all([
      fetch('https://stock.dev.vilhena.ifro.edu.br/api/pedidos', { cache: 'no-store' }).then(r => r.json()),
      fetch('https://stock.dev.vilhena.ifro.edu.br/api/clientes', { cache: 'no-store' }).then(r => r.json())
    ]);
    return { pedidos: resPedidos || [], clientes: resClientes || [] };
  } catch (err) {
    return { pedidos: [], clientes: [] };
  }
}

export default async function PedidosPage() {
  const { pedidos, clientes } = await buscarDadosPedidos();
  
  const mapaClientes = {};
  clientes.forEach(c => { mapaClientes[c.id] = c.nome; });

  return (
    <div>
      <h1>Pedidos Cadastrados</h1>
      {pedidos.length > 0 ? (
        pedidos.map(pedido => (
          <div key={pedido.id} className="cartao">
            <h3>Pedido #{pedido.id}</h3>
            <p style={{ marginTop: '6px' }}><strong>Cliente:</strong> {mapaClientes[pedido.cliente_id] || `Cliente #${pedido.cliente_id}`}</p>
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