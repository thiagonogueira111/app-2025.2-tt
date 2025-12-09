import { useState } from 'react'
import './App.css'

function Simuladohumor() {
    const [emo, setEmo] = useState()

    const Risada = {
        text: 'Oba!', emoji: '😄', color: 'yellow'
    }
    const Choro = {
        text: 'Buáááá!', emoji: '😭', color: 'lightblue'
    }
    const Raiva = {
        text: 'Brrrrr!', emoji: '😡', color: 'red'
    }
    const Nojo = {
        text: 'Eca!', emoji: '🤮', color: 'lightgreen'
    }

    const mudarEmo = (novaEmo) => {
        setEmo(novaEmo)
        document.body.style.backgroundColor = emo.color
        document.getElementById('emoji').innerText = emo.emoji
        document.getElementById('text').innerText = emo.text
    }
    return (
        <div>
            <h2>Sentimento no momento</h2>
            <button onClick={() => mudarEmo(Risada)}>Felicidade</button>
            <button onClick={() => mudarEmo(Choro)}>Tristeza</button>
            <button onClick={() => mudarEmo(Raiva)}>Raiva</button>
            <button onClick={() => mudarEmo(Nojo)}>Nojo</button>
            <h2 id='text'></h2>
            <h2 id='emoji'></h2>
        </div>
    );
};

export default Simuladohumor