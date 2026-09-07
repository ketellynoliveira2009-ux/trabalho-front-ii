import styles from './feminino.module.css';

export default function Feminino() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Individual Feminina</h1>
      
      <section className={styles.section}>
        <h2>Como Funciona a Modalidade</h2>
        <p>
          A categoria individual feminina combina elementos técnicos rigorosos — como saltos de várias rotações, 
          piruetas complexas e sequências de passos — com uma forte expressão artística e musicalidade. As atletas 
          apresentam dois programas: o Programa Curto (com elementos obrigatórios definidos) e o Programa Livre (coreografia 
          mais longa e de livre escolha).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Principais Nomes</h2>
        <ul className={styles.namesList}>
          <li><strong>Yuna Kim</strong> (Coreia do Sul) - Campeã olímpica lendária conhecida por sua consistência e elegância.</li>
          <li><strong>Mao Asada</strong> (Japão) - Famosa por dominar os difíceis saltos Axel triplos em competições internacionais.</li>
          <li><strong>Kamila Valieva</strong> (Rússia) - Atleta de grande destaque técnico e complexidade coreográfica recente.</li>
        </ul>
      </section>
    </div>
  );
}