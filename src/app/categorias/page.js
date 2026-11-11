async function buscarCategorias() {
  try {
    const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/categorias', { cache: 'no-store' });
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function CategoriasPage() {
  const categorias = await buscarCategorias();

  return (
    <div>
      <h1>Categorias</h1>
      <div className="cartao tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 ? (
              categorias.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.nome}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="2">Nenhuma categoria encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}