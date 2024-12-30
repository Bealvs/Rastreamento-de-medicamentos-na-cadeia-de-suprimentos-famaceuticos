import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import './Atualizacaomed.css'

export function Atualizacaomed(){

    return (
        <>
        <Header />
            <div className="fundoAtualiza1">
                <form className="rastreio">
                    <h3>Informe o código de rastreio:</h3>
                    <input type="text" placeholder="" />
                    <button type="submit">Buscar</button>
                </form>
            </div>
        <Footer />
        </>
    );

}