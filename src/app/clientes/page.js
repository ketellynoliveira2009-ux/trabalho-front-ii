'use client';

import { useState, useEffect } from 'react';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarClientes() {
      try {
        const res = await fetch('https://stock.dev.vilhena.ifro.edu.br/api/clientes', {
          cache: 'no-store'
        });
        const dados = await res.json();
        setClientes(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setClientes([]);
      } finally {
        setCarregando(false);
      }
    }

    buscarClientes();
  }, []);

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
            {carregando ? (
              <tr><td colSpan="3">Carregando clientes...</td></tr>
            ) : clientes.length > 0 ? (
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
