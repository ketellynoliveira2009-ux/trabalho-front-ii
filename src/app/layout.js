import './globals.css';

export const metadata = {
  title: 'Trabalho Front-end II',
  description: 'Projeto de Front-end II',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}