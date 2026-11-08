# Estoque Fácil

Aplicação Next.js responsiva para a atividade de controle de estoque.

## Como usar

1. Copie o conteúdo desta pasta para o seu projeto Next.js, mantendo as pastas `src` e `public`.
2. Execute `npm install` e depois `npm run dev`.
3. Abra `http://localhost:3000`.
4. Em `src/app/page.js`, substitua `Nome do integrante 1` e `Nome do integrante 2` pelos nomes da dupla.

A aplicação consome a API pública em `https://stock.dev.vilhena.ifro.edu.br/api`. O fluxo de novo pedido cria primeiro o pedido em `/pedidos` e depois registra cada item em `/itens_pedido`.

## Rotas

- `/` — Home com integrantes e resumo dinâmico.
- `/pedidos` — Listagem dinâmica de pedidos.
- `/pedidos/novo` — Seleção de cliente, inclusão de produtos e criação do pedido.
- `/categorias`, `/produtos` e `/clientes` — Consultas adicionais pelo menu.

## Arquivos principais

- `src/lib/api.js`: base URL e funções de `fetch`.
- `src/components/Header.js`: menu responsivo.
- `src/components/Footer.js`: rodapé.
- `src/app/globals.css`: estilos globais e responsividade.
