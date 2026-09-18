import estilos from './Footer.module.css';
import Link from 'next/link';

export default function Rodape() {
    return (
        <footer className={estilos.rodape}>
            <div className={estilos.conteudoRodape}>
                <p>&copy; 2026 Patinação Artística. Todos os direitos reservados.</p>
                <p>
                    Desenvolvido por {' '}
                    <Link
                        href="https://github.com/ketellynoliveira2009-ux"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={estilos.linkGitHub}
                    >
                        Ketellyn Oliveira
                    </Link>
                </p>
            </div>
        </footer>
    );
}