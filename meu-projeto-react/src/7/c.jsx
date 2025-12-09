import { useState } from 'react'
import './App.css'

function Contador() {
  const [texto, setTexto] = useState('');
  const [Va, setVa] = useState('');
  const [cor, setCor] = useState('');
  return (
    <div>
      <Validadez texto={texto} f={setVa} fColor={setCor} />
      <h2>Você digitou: {texto}</h2>
      <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='Digite algo...' />
      <p style={{ color: cor }}>{Va}</p>
    </div>
  );
}
function Validadez({ texto, f, fColor }) {
  if (texto.length >= 3) {
    f('Válido')
    fColor("green")
  }

  else {
    f('Inválido')
    fColor("red")
  }
}
export default Contador