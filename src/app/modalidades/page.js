import estilos from './modalidades.module.css';

export default function PaginaModalidades() {
    return (
        <div className={estilos.containerModalidades}>
            <h1 className={estilos.titulo}>Modalidades da Patinação</h1>

            <div className={estilos.gradeModalidades}>
                <div className={estilos.itemModalidade}>
                    <h2>Patinação Artística no Gelo</h2>
                    <p className={estilos.descricaoBloco}>
                        Praticada em rinques congelados e famosa nos Jogos Olímpicos de Inverno, compreende as seguintes provas oficiais:
                    </p>
                    <ul className={estilos.listaProvas}>
                        <li><strong>Individual (Masculino e Feminino):</strong> Atletas executam saltos complexos, piruetas e sequências de passos ao som de música.</li>
                        <li><strong>Pares:</strong> Duplas formadas por homem e mulher realizam elementos simultâneos ou conjuntos, como saltos arremessados e levantamentos acrobáticos.</li>
                        <li><strong>Dança no Gelo:</strong> Focada no ritmo, na interpretação musical e na precisão dos passos em casal, sem saltos de grande altura ou giros acrobáticos verticais.</li>
                        <li><strong>Competição por Equipes:</strong> Soma de pontos de diferentes provas para definir o desempenho geral do país.</li>
                    </ul>
                </div>

                <div className={estilos.itemModalidade}>
                    <h2>Patinação Artística no Solo (Sobre Rodas)</h2>
                    <p className={estilos.descricaoBloco}>
                        Praticada em quadras de piso adequado com patins tradicionais (<em>quad</em>) ou em linha (<em>inline</em>), possui regulamentação própria em campeonatos mundiais e continentais:
                    </p>
                    <ul className={estilos.listaProvas}>
                        <li><strong>Patinação Livre (<em>Free Skating</em>):</strong> Programa individual com saltos, piruetas e transições coreográficas.</li>
                        <li><strong>Pares Artísticos:</strong> Semelhante à versão do gelo, adaptada para o piso firme com elementos de sincronicidade e levantamentos.</li>
                        <li><strong>Solo Dance e Pares de Dança:</strong> Foco em passos obrigatórios, batida rítmica e expressão corporal.</li>
                        <li><strong>Figuras Obrigatórias:</strong> Execução de círculos traçados no chão com foco total na precisão do fio e do equilíbrio.</li>
                        <li><strong>Quartetos e Grupos de Show/Precisão:</strong> Coreografias coletivas com forte apelo visual e temático.</li>
                    </ul>
                </div>

                <div className={estilos.itemModalidade}>
                    <h2>Patinação Artística em Show e Espetáculos</h2>
                    <p className={estilos.descricaoBloco}>
                        Concentrada no entretenimento de massa, unindo o teatro, a dança cênica e o circo ao esporte:
                    </p>
                    <ul className={estilos.listaProvas}>
                        <li><strong>Shows no Gelo (ex: <em>Disney on Ice</em> ou <em>Cirque du Soleil</em>):</strong> Grandes produções artísticas itinerantes em pistas portáteis.</li>
                        <li><strong>Teatro no Gelo / Grandes Grupos:</strong> Apresentações com dezenas de patinadores contando histórias com figurinos elaborados e efeitos cênicos.</li>
                        <li><strong>Galas e Competições Pró-Amador:</strong> Eventos de exibição onde atletas olímpicos se apresentam sem a pressão de notas técnicas rigorosas.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}