import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function MenuRestaurante() {
  const pratos = [
    { nome: 'Bolo Brumadinho', preco: 800.00, descricao: 'Cascata de sabor' },
    { nome: 'Sopa de Morcego', preco: 90.50, descricao: 'Morcego recem capturado' },
    { nome: 'Pizza', preco: 900.30, descricao: 'Somente sabor calabreso' },
    { nome: 'Sorvete', preco: 10.90, descricao: 'gelado' }
  ];

    return (
    <div>
      <h2>Menu</h2>
      <div className='menu-grid'>
        {pratos.map((prato, index) => (
          <div key={index} className='prato-card'>
            <h3>{prato.nome}</h3>
            <p className='preco'>R$ {prato.preco.toFixed(2)}</p>
            <p className='descricao'>{prato.descricao}</p>
          </div>))}
      </div>
    </div>
  )
}
export default MenuRestaurante;