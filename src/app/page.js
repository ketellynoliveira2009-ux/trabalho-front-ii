import Link from 'next/link';
import Image from 'next/image';
import estilos from './page.module.css';

const destaques = [
  {
    imagem: '/patinadora.jpg',
    nome: 'Kamila Valieva',
    ano: '2022',
    pais: 'Rússia',
    descricao: 'Fotografia da patinadora artística russa Kamila Valieva durante os Jogos Olímpicos de Inverno de 2022, realizados em Pequim, na China. Na imagem, ela aparece realizando um movimento de grande flexibilidade inclinando o corpo para trás (Ina Bauer), vestindo seu figurino gradiente em tons de roxo e lilás decorado com cristais. A performance em questão faz parte do seu aclamado e marcante Programa Curto (Short Program), apresentado ao som da música melancólica "In Memoriam".'
  },
  {
    imagem: '/patinador.jpg',
    nome: 'Yuzuru Hanyu',
    ano: '2018',
    pais: 'Japão',
    descricao: 'Fotografia do patinador artístico japonês Yuzuru Hanyu durante os Jogos Olímpicos de Inverno de 2018, realizados em PyeongChang, na Coreia do Sul. Na imagem, ele aparece da cintura para cima em uma pose dramática no gelo, vestindo seu traje branco e dourado do programa "SEIMEI", com luvas pretas e os braços abertos em um fundo roxo desfocado.'
  },
  {
    imagem: '/pares.jpg',
    nome: 'Gabriella Papadakis & Guillaume Cizeron',
    ano: '2018',
    pais: 'França',
    descricao: 'Fotografia dos patinadores franceses Gabriella Papadakis e Guillaume Cizeron na modalidade de Dança no Gelo durante os Jogos Olímpicos de Inverno de 2018, realizados em PyeongChang, na Coreia do Sul. Na imagem, os atletas aparecem executando um movimento expressivo e inclinado juntos no gelo, vestindo seus elegantes trajes pretos. A performance faz parte do seu aclamado Programa Curto (Short Dance) daquela temporada, apresentado ao som das canções de Ed Sheeran, "Shape of You" e "Thinking Out Loud".'
  }
];

export default function PaginaInicial() {
  return (
    <div className={estilos.containerPrincipal}>
      <section className={estilos.secaoHero}>
        <h1 className={estilos.tituloPrincipal}>A Magia da Patinação Artística</h1>
        <p className={estilos.descricaoPrincipal}>
          Explore a elegância, a força e a precisão de um dos esportes mais belos e exigentes do mundo.
        </p>
        <Link href="/modalidades" className={estilos.botaoExplorar}>
          Ver Modalidades
        </Link>
      </section>

      <section className={estilos.secaoCards}>
        <div className={estilos.gridDestaques}>
          {destaques.map((item, index) => (
            <div key={index} className={estilos.card}>
              <div className={estilos.containerImagem}>
                <Image 
                  src={item.imagem} 
                  alt={item.nome}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={estilos.conteudoCard}>
                <h2>{item.nome}</h2>
                <p className={estilos.detalhes}>
                  <strong>Ano:</strong> {item.ano} | <strong>País:</strong> {item.pais}
                </p>
                <p>{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}