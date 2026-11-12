'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://stock.dev.vilhena.ifro.edu.br/api';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const res = await fetch(`${API_URL}/produtos`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Erro ${res.status} ao carregar produtos.`);
        const dados = await res.json();
        setProdutos(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setErro('Não foi possível carregar os produtos. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <div className="cartao tabela-container">
        {erro ? <div className="erro" role="alert">{erro}</div> : (
          <table>
            <thead>
              <tr><th>ID</th><th>Nome</th><th>Preço</th></tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="3">Carregando produtos...</td></tr>
              ) : produtos.length > 0 ? (
                produtos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td><td>{prod.nome}</td>
                    <td>R$ {Number(prod.preco || 0).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">Nenhum produto encontrado.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
