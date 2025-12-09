import { useState } from 'react'
import './App.css'


function App() {
 const [curtidas, setCurtidas] = useState(0)

 const Curtir = () => {
   setCurtidas(curtidas + 1)
 };

 return (
   <>
    <button onClick={() => Curtir()}>Curtir</button>
    <p >Curtidas: {curtidas}</p>
   </>
 )
}

export default App