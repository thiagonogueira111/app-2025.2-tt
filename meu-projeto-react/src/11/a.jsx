import { useState } from 'react'
import './App.css'

function App() {
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        idade: 0
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados({
            ...dados,
            [name]: value
        });
    };

    return (
        <div>
            <h2>Formulário</h2>
            <form>
                <div>
                    <div>
                        <label>Nome:</label>
                        <input type="text" name='nome' value={dados.nome} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name='email' value={dados.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Idade:</label>
                        <input type="number" name='idade' value={dados.idade} onChange={handleChange} />
                    </div>
                </div>
            </form>

            <div>
                <h2>Dados Preenchidos</h2>
                <p><strong>Nome: {dados.nome}</strong></p>
                <p><strong>Email: {dados.email}</strong></p>
                <p><strong>Idade: {dados.idade}</strong></p>
            </div>
        </div>
    )
}

export default App