function ListaComidas() {
    const comidas = ['bolo brumadinho', 'sopa de morcego', 'pizz', 'sorvete'];

    return (
        <div>
            <h2>Minhas Comidas Preferidas</h2>
            <ol>
                {comidas.map((comida, index) => (
                    <li key={index}>{comida}</li>
                ))}
            </ol>
        </div>
    )
}

export default ListaComidas;