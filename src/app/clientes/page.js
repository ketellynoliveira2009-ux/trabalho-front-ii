'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://stock.dev.vilhena.ifro.edu.br/api';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarClientes() {
      try {
        const res = await fetch(`${API_URL}/clientes`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Erro ${res.status} ao carregar clientes.`);
        const dados = await res.json();
        setClientes(Array.isArray(dados) ? dados : []);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setErro('Não foi possível carregar os clientes. Tente novamente.');
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
        {erro ? <div className="erro" role="alert">{erro}</div> : (
          <table>
            <thead>
              <tr><th>ID</th><th>Nome</th><th>E-mail</th></tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan="3">Carregando clientes...</td></tr>
              ) : clientes.length > 0 ? (
                clientes.map((cli) => (
                  <tr key={cli.id}>
                    <td>{cli.id}</td><td>{cli.nome}</td><td>{cli.email || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3">Nenhum cliente encontrado.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
