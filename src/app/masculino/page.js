import styles from './masculino.module.css';

export default function Masculino() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Individual Masculina</h1>

            <section className={styles.section}>
                <h2>Como Funciona a Modalidade</h2>
                <p>
                    A patinação individual masculina é marcada por altíssimo grau de exigência atlética e força física. Os patinadores
                    executam saltos quádruplos impressionantes (como Toe Loop, Salchow e Lutz), combinados com transições velozes e
                    sequências de passos intrincadas que testam o equilíbrio e a resistência aeróbica.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Principais Nomes</h2>
                <ul className={styles.namesList}>
                    <li><strong>Yuzuru Hanyu</strong> (Japão) - Considerado um dos maiores patinadores de todos os tempos, bicampeão olímpico e pioneiro em saltos históricos.</li>
                    <li><strong>Nathan Chen</strong> (Estados Unidos) - Conhecido como o &apos;Rei dos Quads&apos;, famoso por sua potência e precisão atlética.</li>
                    <li><strong>Evgeni Plushenko</strong> (Rússia) - Ícone histórico com múltiplas medalhas olímpicas e domínio técnico marcante.</li>
                </ul>
            </section>
        </div>
    );
}