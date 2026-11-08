import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Estoque Fácil | Controle de estoque',
    description: 'Aplicação responsiva para controle de produtos, clientes e pedidos.',
};

export default function Layout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <Header />
                <main className="conteudo-principal">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
