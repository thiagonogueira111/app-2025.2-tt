import './App.css'
function BoasVindas({ usuario }) {
    return <h1>Bem vindo de volta, {usuario}!</h1>
}
export default function MyApp() {
    let user = prompt("Como você se chama?")
    return <BoasVindas usuario={user} />
}