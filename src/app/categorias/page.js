'use client';

import { useState, useEffect } from 'react';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarCategorias() {
      try {
        const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/categorias', {
          cache: 'no-store'
        });
        const dados = await res.json();
        setCategorias(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        setCategorias([]);
      } finally {
        setCarregando(false);
      }
    }

    buscarCategorias();
  }, []);

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
            {carregando ? (
              <tr><td colSpan="2">Carregando categorias...</td></tr>
            ) : categorias.length > 0 ? (
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