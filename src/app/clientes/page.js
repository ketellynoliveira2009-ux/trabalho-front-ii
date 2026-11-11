async function buscarClientes() {
  try {
    const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/clientes', { cache: 'no-store' });
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function ClientesPage() {
  const clientes = await buscarClientes();

  return (
    <div>
      <h1>Clientes</h1>
      <div className="cartao tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map(cli => (
                <tr key={cli.id}>
                  <td>{cli.id}</td>
                  <td>{cli.nome}</td>
                  <td>{cli.email || '-'}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">Nenhum cliente encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}