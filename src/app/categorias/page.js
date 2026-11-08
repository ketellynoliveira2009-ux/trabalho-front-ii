import ListaEntidade from '../../components/ListaEntidade';
export default function Categorias() { return <ListaEntidade recurso="categorias" titulo="Categorias" descricao="Organize o catálogo por grupos de produtos." colunas={[{ chave: 'id', titulo: 'Código' }, { chave: 'nome', titulo: 'Nome da categoria' }]} />; }
