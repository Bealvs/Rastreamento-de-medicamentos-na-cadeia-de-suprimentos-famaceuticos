import { Header } from "../../components/header/Header"
import { Sidemenu } from "../../components/sidebar/Sidemenu"
import { Footer } from "../../components/footer/Footer"
import './login.css'

export function Login(){

return(
    <>
        <Header/>
        <Sidemenu/>

        <div className="container">
            <div className="login">
                <h3>Login do administrador</h3>
                <section className="inputs">
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
            </div>
        </div>
        <Footer/>
    </>
)
}