import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import Sidebar from "../../components/sidebar/Sidebar";
import './Login.css'

export function Login(){

return(
    <>
        <Header/>
        <Sidebar/>
        <div className="fundo">
            <form className="login">
                <h3>Login do administrador</h3>
                <section className="inputsLogin">
                    <label>
                        <input type="text" placeholder="CPF"/>
                    </label>
                    <label>
                        <input type="text" placeholder="CNPJ da empresa"/>
                    </label>
                    <label>
                        <input type="text" placeholder="Senha"/>
                    </label>
                </section>
                <nav className="links">
                    <a id="init" href="">Esqueceu a senha?</a>
                    <a id="final" href="">Não tem uma conta?</a>
                </nav>
                <button type="submit">Sign in</button>
            </form>
        </div>
        <Footer/>
    </>
)
}