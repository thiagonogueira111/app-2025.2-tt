function ListaHobbies() {
    const hobbies = ['Jogar Bola', 'Sair', 'Ouvir música', 'Estudar'];

    return (
        <div>
            <h2>Meus Hobbies Preferidos</h2>
            <ul>
                {hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListaHobbies;