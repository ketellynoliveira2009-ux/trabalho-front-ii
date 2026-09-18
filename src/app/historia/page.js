import estilos from './historia.module.css';

export default function PaginaHistoria() {
    return (
        <div className={estilos.containerHistoria}>
            <h1 className={estilos.titulo}>História da Patinação Artística</h1>

            <div className={estilos.blocoTexto}>
                <p>
                    A Patinação surgiu na Europa e inicialmente foi utilizada como meio de transporte para atravessar lagos e canais congelados pelo rigoroso inverno europeu, a partir daí se tornou uma prática de lazer e recreação, sendo restrita apenas ao inverno, já que quando o clima esquentava os corpos d&#39;água congelados derretiam.
                </p>
                <p>
                    A Patinação Artística, especificamente, surgiu de uma brincadeira em que os patinadores faziam desenhos no gelo com suas lâminas enquanto patinavam, e foi assim que começaram a realizar concursos para ver quem fazia os desenhos mais bonitos e complexos. Dizem que naquela época a glória era conseguir assinar o próprio nome no gelo, e foi desse tipo de competição que surgiu o termo “Figure Skating”, como é conhecida a patinação artística internacionalmente. Assim, a atividade tornou-se um esporte e começaram a surgir os primeiros saltos e corrupios.
                </p>
                <p>
                    A Patinação Artística Sobre Rodas apareceu como uma alternativa para os patinadores do gelo que não tinham como praticar durante o verão, já que os lagos se descongelavam. Então, no início, os praticantes dos dois tipos de patinação (gelo e rodas) eram os mesmos, por isso as duas técnicas são muito semelhantes e utilizam praticamente os mesmos termos em seu vocabulário. Não demorou muito para que todos os elementos executados sobre o gelo fossem transportados para as rodas, criando assim esse maravilhoso esporte/arte, tal qual conhecemos hoje. A Patinação Artística é considerada por muitos como a mais espetacular e excitante forma dos esportes sobre rodas, sendo considerada também uma das modalidades desportivas mais completas da atualidade, pois estimula fortemente a coordenação motora, a postura, o equilíbrio, a lateralidade e a capacidade de concentração, além de trazer vários outros benefícios.
                </p>
            </div>
        </div> 
    );
}