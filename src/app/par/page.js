import styles from './par.module.css';

export default function Par() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Duplas / Par</h1>
      
     <section className={styles.section}>
        <h2>Como Funciona a Modalidade</h2>
        <p>
          A categoria de pares exige uma sincronia impressionante entre os dois atletas. Além dos elementos individuais 
          realizados em perfeita harmonia (como saltos e piruetas espelhadas), a modalidade inclui manobras exclusivas 
          e eletrizantes, como elevações acrobáticas aéreas complexas, saltos arremessados e a famosa espiral da morte.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Principais Nomes</h2>
        <ul className={styles.namesList}>
          <li><strong>Tatiana Volosozhar e Maxim Trankov</strong> (Rússia) - Campeões olímpicos com apresentações marcadas por grande intensidade dramática e técnica impecável.</li>
          <li><strong>Sui Wenjing e Han Cong</strong> (China) - Dupla de enorme sintonia artística e campeões olímpicos em Pequim 2022.</li>
          <li><strong>Aliona Savchenko e Bruno Massot</strong> (Alemanha) - Conhecidos pela inovação técnica e profunda emoção em suas coreografias.</li>
        </ul>
      </section>
    </div>
  );
}