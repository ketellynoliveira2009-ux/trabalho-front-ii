export const URL_API = 'https://stock.dev.vilhena.ifro.edu.br/api';

export async function buscarRecurso(recurso, opcoes = {}) {
  const resposta = await fetch(`${URL_API}/${recurso}`, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...(opcoes.headers || {}),
    },
    cache: 'no-store',
  });

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    const mensagem = dados?.erro || (Array.isArray(dados?.erros) ? dados.erros.join(', ') : 'Não foi possível concluir a requisição.');
    throw new Error(mensagem);
  }
  return dados;
}

export function consultar(recurso) {
  return buscarRecurso(recurso);
}

export function enviar(recurso, metodo, corpo) {
  return buscarRecurso(recurso, {
    method: metodo,
    body: JSON.stringify(corpo),
  });
}

export function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(data) {
  if (!data) return '—';
  return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}
