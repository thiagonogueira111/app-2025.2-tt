import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Contador() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div>
      {mostrar && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfa4b7iohEEWQjPE9K1LucaI5GRlGEoM5SyA&s" alt="" />}
      <p></p>
      <button onClick={() => setMostrar(!mostrar)}>
        {mostrar ? 'Esconder imagem' : 'mostrar imagem'}
      </button>
    </div>
  );
}

export default Contador