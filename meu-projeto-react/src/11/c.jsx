import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [dados, setDados] = useState({ estado: "", cidade: "", cep: "" })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value })
  }

  return (
    <>
      <fieldset>
        <legend>Forms:</legend>
        <form action="">
          <span>estado :</span>
          <input type="text" placeholder='Digite aqui' name='estado' value={dados.estado} onChange={handleChange} /><br />
          <span>cidade :</span>
          <input type="text" placeholder='Digite aqui' name='cidade' value={dados.cidade} onChange={handleChange} /> <br />
          <span>cep :</span>
          <input type="text" placeholder='Digite aqui' name='cep' value={dados.cep} onChange={handleChange} />
        </form>
      </fieldset>

      <fieldset>
        <legend>Dados Preenchidos</legend>
        <span>estado: {dados.estado}</span> <br />
        <span>cidade: {dados.cidade}</span> <br />
        <span>cep: {dados.cep}</span>

        <p><span id='frase'> </span></p>
      </fieldset>
    </>
  )
}



export default App