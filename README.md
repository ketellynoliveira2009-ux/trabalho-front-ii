# Estoque Fácil

Aplicação Next.js responsiva para a atividade de controle de estoque.

## Como executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para validar a produção, execute `npm run build` e depois `npm run start`. A aplicação consome a API pública em `https://stock.dev.vilhena.ifro.edu.br/api`.

## Fluxo de pedidos

A criação de pedido envia primeiro `cliente_id` para `/pedidos`. Depois, envia cada item individualmente para `/itens_pedido`, com `pedido_id`, `produto_id`, `quantidade` e `preco_unitario`, conforme a documentação da API.

## Rotas

- `/` — Home com integrantes.
- `/pedidos` — Listagem dinâmica de pedidos, clientes, status, data e itens.
- `/pedidos/novo` — Seleção de cliente, inclusão de produtos e criação do pedido.
- `/categorias`, `/produtos` e `/clientes` — Consultas adicionais pelo menu.

## Organização

- `src/app` — páginas e estilos globais.
- `src/components/Header.js` — menu responsivo.
- `src/components/Footer.js` — rodapé.

## Entrega

Não inclua `node_modules`, `.next` ou arquivos de build no ZIP. Após extrair a entrega, execute `npm install` para instalar as dependências com as permissões corretas e então execute `npm run build`.
