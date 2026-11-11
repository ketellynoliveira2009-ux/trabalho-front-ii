import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ 
      background: '#fff', 
      borderBottom: '1px solid #ddd', 
      height: '60px',                /* Altura fixa */
      display: 'flex', 
      alignItems: 'center', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        width: '100%',
        margin: '0 auto', 
        padding: '0 16px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        whiteSpace: 'nowrap'           /* Impede que o texto quebre de linha */
      }}>
        <h2 style={{ fontSize: '1.2rem', color: '#0066cc', margin: 0 }}>
          Controle de Estoque
        </h2>
        
        <nav style={{ 
          display: 'flex', 
          gap: '20px', 
          alignItems: 'center',
          overflowX: 'auto'            /* Permite rolar suavemente caso a tela seja menor que os links */
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Home</Link>
          <Link href="/categorias" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Categorias</Link>
          <Link href="/produtos" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Produtos</Link>
          <Link href="/clientes" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Clientes</Link>
          <Link href="/pedidos" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Listar Pedidos</Link>
          <Link href="/pedidos/novo" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold', fontSize: '0.95rem' }}>Criar Pedido</Link>
        </nav>
      </div>
    </header>
  );
}