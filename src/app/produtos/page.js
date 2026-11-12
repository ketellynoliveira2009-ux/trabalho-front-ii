'use client';

import { useState, useEffect } from 'react';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/produtos', {
          cache: 'no-store'
        });
        const dados = await res.json();
        setProdutos(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setProdutos([]);
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {carregando ? (
              <tr><td colSpan="3">Carregando produtos...</td></tr>
            ) : produtos.length > 0 ? (
              produtos.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.nome}</td>
                  <td>R$ {Number(prod.preco || 0).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3">Nenhum produto encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}