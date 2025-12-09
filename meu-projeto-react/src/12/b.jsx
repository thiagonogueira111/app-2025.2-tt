import { useState } from 'react'
import './App.css'

function App() {
 const [favoritos, setFavoritos] = useState(5)
 const [favoritado, setfavoritado] = useState(true)

 const estilo = {backgroundColor: favoritado ? "gray" : "yellow"}

 const Favoritar = () => {
   setFavoritos(favoritos + 1)
   setfavoritado(false)
 };

 const DesFavoritar = () => {
   setFavoritos(favoritos - 1)
   setfavoritado(true)
 };

 return (
   <>
   {favoritado ? <button style={estilo} onClick={() => Favoritar()}>Favoritar 🌟 ({favoritos})</button> :  <button style={estilo}  onClick={() => DesFavoritar()}>Remover Favoritado ⭐ ({favoritos})</button> }  
   </>
 )
}

export default App