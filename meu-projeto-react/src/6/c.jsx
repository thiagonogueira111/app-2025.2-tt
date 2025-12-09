import { useState } from 'react'
import './App.css'

function Contador() {
  const [mostrar, setMostrar] = useState(true);
  const buttonClass = mostrar ? '' : 'abrir-cofre';

  return (
    <div className="Contador-container">
      <h1>Cofre Seguro</h1>
      {mostrar && (
        <div className="lista-cofre">
          <h2>Lista de compras:</h2>
          <ol>
            <li>Diamante</li>
            <li>Camisa do luva de pedreiro</li>
            <li>estatua do davi britto</li>
          </ol>
        </div>
      )}
      <p></p>
      <button onClick={() => setMostrar(!mostrar)} className={buttonClass}>
        {mostrar ? 'Fechar Cofre 🔒' : 'Abrir Cofre 🔓'}
      </button>
    </div>
  );
}

export default Contador