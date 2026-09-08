import './globals.css';
import Cabecalho from '@/components/Header';
import Rodape from '@/components/Footer';

export const metadata = {
    title: 'Patinação Artística',
    description: 'Aplicação web desenvolvida em React e Next.js',
    icons: {
        icon: '/iceSkate.png',
    },
};

export default function RaizLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Cabecalho />
                    <main style={{ flex: 1 }}>
                        {children}
                    </main>
                    <Rodape />
                </div>
            </body>
        </html>
    );
}