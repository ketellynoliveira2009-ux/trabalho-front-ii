'use client';

import { useEffect, useState } from 'react';
import { consultar, formatarMoeda } from '../lib/api';

export default function ListaEntidade({ recurso, titulo, descricao, colunas, transformar }) {
  const [registros, setRegistros] = useState([]); const [estado, setEstado] = useState('carregando'); const [erro, setErro] = useState('');
  useEffect(() => { consultar(recurso).then(setRegistros).then(() => setEstado('pronto')).catch((e) => { setErro(e.message); setEstado('erro'); }); }, [recurso]);
  return <section className="container"><div className="cabecalho-pagina"><div><span className="eyebrow">Base de dados</span><h1>{titulo}</h1><p>{descricao}</p></div></div><div className="card tabela-wrap">{estado === 'carregando' && <div className="carregando">Carregando dados da API...</div>}{estado === 'erro' && <div className="erro">{erro}</div>}{estado === 'pronto' && <table className="tabela"><thead><tr>{colunas.map((coluna) => <th key={coluna.chave}>{coluna.titulo}</th>)}</tr></thead><tbody>{registros.map((registro) => <tr key={registro.id}>{colunas.map((coluna) => <td key={coluna.chave}>{transformar ? transformar(registro, coluna.chave) : formatarCampo(registro, coluna.chave)}</td>)}</tr>)}</tbody></table>}</div></section>;
}

function formatarCampo(registro, chave) {
  if (chave === 'preco') return <strong>{formatarMoeda(registro[chave])}</strong>;
  return registro[chave] || '—';
}
