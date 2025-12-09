function StatusJogo({ nivel, pontos }) {
    const MaxPontos = nivel * 1000;
    const progresso = Math.min((pontos / MaxPontos) * 100, 100);
    const corBarra = progresso < 30 ? 'red' : progresso < 70 ? 'orange' : 'green';
    return (
     <div>
        <h2>Nível {nivel}</h2>
        <p>Pontos: {pontos}/{MaxPontos}</p>
        <div
            style={{
                width: '200px',
                height: '20px',
                backgroundColor: '#ddd',
                borderRadius: '10px',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    width: `${progresso}%`,
                    height: '100%',
                    backgroundColor: corBarra,
                    transition: 'all 0.3s ease'
                }}
            ></div>
        </div>
        <p>{progresso.toFixed(1)}% completo</p>
    </div>
)
}

export default function MyApp() {
    return <StatusJogo nivel={6} pontos={3000} />
}