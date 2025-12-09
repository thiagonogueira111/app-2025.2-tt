import React, { useState } from 'react';


const Taxas = {
    BRL: { USD: 0.25, EUR: 0.20, BRL: 1.00 },
    USD: { BRL: 5.50, EUR: 1.00, USD: 1.00 },
    EUR: { BRL: 6.00, USD: 1.20, EUR: 1.00 },
};
function ConversorMoedas() {
    const [val, setVal] = useState(0);
    const [mOrig, setMOrig] = useState('BRL');
    const [mDest, setMDest] = useState('USD');
    const [resu, setResult] = useState(0);

    const formatarResultado = (val, moeda) => {
        return `${val.toFixed(2)} ${moeda}`;
    };
    const Calcular = () => {
        const valNum = parseFloat(val);
        if (isNaN(valNum) || valNum < 0) {
            setResult(0);
            return;
        }
        const taxa = Taxas[mOrig]?.[mDest];

        if (taxa !== undefined) {
            const resuCal = valNum * taxa;
            setResult(resuCal);
        } else {
            setResult(0);
        }
    };

    return (
        <div>
            <h2>Conversor de Moedas</h2>
            <p>Valor convertido:</p>
            <input
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder='Insira um valor'
            />
            <p>Converter de:</p>
            <select value={mOrig} onChange={(e) => setMOrig(e.target.value)}>
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
            </select>

            <p>Converter para:</p>
            <select value={mDest} onChange={(e) => setMDest(e.target.value)}>
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
            </select>
            <div>
                <button onClick={Calcular}>calculo final</button>
            </div>

            <h2 id='resu'>
                Resultado: {formatarResultado(resu, mDest)}
            </h2>
        </div>
    );
}

export default ConversorMoedas;