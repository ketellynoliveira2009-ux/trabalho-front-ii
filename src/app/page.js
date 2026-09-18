import Link from 'next/link';
import Image from 'next/image';
import estilos from './page.module.css';

export default function PaginaInicial() {
    return (
        <div className={estilos.containerPrincipal}>
            <section className={estilos.secaoTopo}>
                <h1 className={estilos.tituloPrincipal}>A Magia da Patinação Artística</h1>
                <Link href="/modalidades" className={estilos.botaoExplorar}>
                    Ver Modalidades
                </Link>
            </section>

            <section className={estilos.secaoCards}>
                <div className={estilos.gridDestaques}>

                    {/* 1*/}
                    <div className={estilos.card}>
                        <div className={estilos.containerImagem}>
                            <Image
                                src="/patinadora.jpg"
                                alt="Kamila Valieva"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={estilos.conteudoCard}>
                            <h2>Kamila Valieva</h2>
                            <p className={estilos.detalhes}>
                                <strong>Ano:</strong> 2022 | <strong>País:</strong> Rússia
                            </p>
                            <p>
                                Fotografia da patinadora artística russa Kamila Valieva durante os Jogos Olímpicos de Inverno de 2022, realizados em Pequim, na China. Na imagem, ela aparece realizando um movimento de grande flexibilidade inclinando o corpo para trás (Ina Bauer), vestindo seu figurino gradiente em tons de roxo e lilás decorado com cristais. A performance em questão faz parte do seu aclamado e marcante Programa Curto (Short Program), apresentado ao som da música melancólica &quot;In Memoriam&quot;.
                            </p>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className={estilos.card}>
                        <div className={estilos.containerImagem}>
                            <Image
                                src="/patinador.jpg"
                                alt="Yuzuru Hanyu"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={estilos.conteudoCard}>
                            <h2>Yuzuru Hanyu</h2>
                            <p className={estilos.detalhes}>
                                <strong>Ano:</strong> 2018 | <strong>País:</strong> Japão
                            </p>
                            <p>
                                Fotografia do patinador artístico japonês Yuzuru Hanyu durante os Jogos Olímpicos de Inverno de 2018, realizados em PyeongChang, na Coreia do Sul. Na imagem, ele aparece da cintura para cima em uma pose dramática no gelo, vestindo seu traje branco e dourado do programa &quot;SEIMEI&quot;, com luvas pretas e os braços abertos em um fundo roxo desfocado.
                            </p>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className={estilos.card}>
                        <div className={estilos.containerImagem}>
                            <Image
                                src="/pares.jpg"
                                alt="Gabriella Papadakis & Guillaume Cizeron"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={estilos.conteudoCard}>
                            <h2>Gabriella Papadakis & Guillaume Cizeron</h2>
                            <p className={estilos.detalhes}>
                                <strong>Ano:</strong> 2018 | <strong>País:</strong> França
                            </p>
                            <p>
                                Fotografia dos patinadores franceses Gabriella Papadakis e Guillaume Cizeron na modalidade de Dança no Gelo durante os Jogos Olímpicos de Inverno de 2018, realizados em PyeongChang, na Coreia do Sul. Na imagem, os atletas aparecem executando um movimento expressivo e inclinado juntos no gelo, vestindo seus elegantes trajes pretos. A performance faz parte do seu aclamado Programa Curto (Short Dance) daquela temporada, apresentado ao som das canções de Ed Sheeran, &quot;Shape of You&quot; e &quot;Thinking Out Loud&quot;.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}