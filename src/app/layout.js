import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Controle de Estoque',
  description: 'Aplicação Web desenvolvida para disciplina',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container-principal">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}