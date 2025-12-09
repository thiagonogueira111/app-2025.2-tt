import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function Cartaolivro({ titulo, autor, ano, genero }) {
  return (
    <div className='card-livro'>
      <h2>{titulo}</h2>
      <p><strong>autor:</strong> {autor}</p>
      <p><strong>Gênero:</strong> {genero}</p>
      <p><strong>Ano:</strong> {ano}</p>
    </div>);
}
function App() {
  return (
    <div>
      <Cartaolivro titulo='A Facada' autor='Pedro Esfaqueador' ano={2025} genero='Terror' />
    </div>
  );
}
export default App;