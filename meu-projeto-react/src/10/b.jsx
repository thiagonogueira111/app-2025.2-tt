function Calculadora() {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);

    const calcular = (operacao) => {
        let res = Number(n1) * Number(n2);
        document.getElementById("resul").innerText = `Resultado: ${res}`
    }
    return (
        <div>
            <h2>Calcular a Área</h2>
            <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} placeholder="Altura" />
            <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} placeholder="Comprimento" />
            <button onClick={() => calcular()}>Calcular</button>
            <h2 id="resul">Resultado do cálculo: </h2>
        </div>
    );
};

export default Calculadora