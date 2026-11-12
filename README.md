# Estoque Fácil

Aplicação Next.js responsiva para a atividade de controle de estoque.

## Como usar

1. Execute `npm install`.
2. Execute `npm run dev`.
3. Abra `http://localhost:3000`.

Para validar a entrega, execute `npm run build`. A aplicação consome a API pública em `https://stock.dev.vilhena.ifro.edu.br/api`.

## Fluxo de pedidos

A criação de pedido envia primeiro `cliente_id` para `/pedidos`. Depois, envia cada item individualmente para `/itens_pedido`, com `pedido_id`, `produto_id`, `quantidade` e `preco_unitario`, conforme a documentação da API.

## Rotas

- `/` — Home com integrantes.
- `/pedidos` — Listagem dinâmica de pedidos, clientes, status, data e itens.
- `/pedidos/novo` — Seleção de cliente, inclusão de produtos e criação do pedido.
- `/categorias`, `/produtos` e `/clientes` — Consultas adicionais pelo menu.

## Arquivos principais

- As páginas utilizam `fetch` diretamente para consumir a API pública.
- `src/components/Header.js` — Menu responsivo.
- `src/components/Footer.js` — Rodapé.
- `src/app/globals.css` — Estilos globais e responsividade.
