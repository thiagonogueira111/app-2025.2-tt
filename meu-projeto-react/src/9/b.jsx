import { useState } from 'react'
import './App.css'


function Alterartamanho() {
  const [cor, setCor] = useState('20px');


  const mudarCor = (novaCor) => {
    setCor(novaCor);
    document.getElementById('text').style.fontSize = novaCor
  };
  return (
    <div>
      <h2 id='text'>Alterar o tamanho</h2>
      <button onClick={() => mudarCor('10px')}>P</button>
      <button onClick={() => mudarCor('20px')}>M</button>
      <button onClick={() => mudarCor('50px')}>G</button>
    </div>
  );
}
export default Alterartamanho