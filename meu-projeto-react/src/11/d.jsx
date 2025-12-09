import { useState } from 'react'
import './App.css'

function App() {
 const [dados, setDados] = useState({ cabelo: "", olhos: "", acessorios: []})

const handleChange = (e) => {
 const { name, value, type, checked } = e.target;

 if (type === "checkbox") {
   setDados((prev) => {
     if (checked) {
       return { ...prev, [name]: [...prev[name], value] };
     } else {
       return { ...prev, [name]: prev[name].filter((item) => item !== value) };
     }
   });
 } else {
   setDados((prev) => ({ ...prev, [name]: value }));
 }
};
 return (
   <>
     <fieldset>
       <legend>Criador de Avatar:</legend>
       <form >
         <select name='cabelo' value={dados.cabelo} onChange={handleChange} >
           <option value="Castanho">Castanho</option>
           <option value="Preto">Preto</option>
           <option value="Loiro">Loiro</option>
           <option value="Careca">Careca</option>
         </select><br />
         <p>
           <label>Marrom: </label><input name='olhos' type="radio" value={"marrom"} onChange={handleChange} /> <br />
           <label>Verde: </label><input name='olhos' type="radio" value={"Verde"} onChange={handleChange} /> <br />
           <label>Azuis: </label><input name='olhos' type="radio" value={"Azuis"} onChange={handleChange} /> <br />
         </p>
         <p>Escolha os acessorios:</p>
         <label>Anel</label><input type="checkbox" name='acessorios' value={"Anel"} onChange={handleChange} /> <br />
         <label>Cordão</label><input type="checkbox" name='acessorios' value={"Cordão"} onChange={handleChange} /> <br />
         <label>Pulseira</label><input type="checkbox" name='acessorios' value={"Pulseira"} onChange={handleChange} /> <br />
         <label>Chapéu</label><input type="checkbox" name='acessorios' value={"Chapéu"} onChange={handleChange} /> <br />
       </form>
     </fieldset>
     <fieldset>
       <legend>Dados Do Avatar:</legend>
       <span>Cor Do Cabelo: {dados.cabelo}</span> <br />
       <span>Cor Dos Olhos: {dados.olhos}</span> <br />
       <span>Acessorios: {dados.acessorios}</span> <br />
       <p><span id='frase'> </span></p>
     </fieldset>
   </>
 )
}
export default App