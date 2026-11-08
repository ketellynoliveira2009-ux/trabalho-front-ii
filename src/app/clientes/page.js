import ListaEntidade from '../../components/ListaEntidade';
export default function Clientes() { return <ListaEntidade recurso="clientes" titulo="Clientes" descricao="Visualize as pessoas cadastradas para os pedidos." colunas={[{ chave: 'id', titulo: 'Código' }, { chave: 'nome', titulo: 'Nome' }, { chave: 'email', titulo: 'E-mail' }, { chave: 'telefone', titulo: 'Telefone' }]} />; }
