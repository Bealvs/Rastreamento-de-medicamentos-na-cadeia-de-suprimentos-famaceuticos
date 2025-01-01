import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import './Cadastromed.css'

export function Cadastromed() {
    return (
        <>
            <Header />
            <SidebarAdm/>
            <div className="fundoCadastro">
                <form className="cadastro">
                    <h2>Cadastro de medicamento</h2>
                    <h4>1. Informações do medicamento</h4>
                    <div className="secao">
                        <div className="block">
                            <label>Nome comercial:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Nome genérico:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Características do produto:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Código de identificação do produto:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Lote:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Data de fabricação:</label>
                            <input type="date" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Data de validade:</label>
                            <input type="date" placeholder="" />
                        </div>
                    </div>
                    <hr />
                    <h4>2. Informações do fabricante</h4>
                    <div className="secao">
                        <div className="block">
                            <label>Nome do fabricante:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Nome comercial:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>CNPJ:</label>
                            <input type="text" placeholder="" />
                        </div>
                    </div>
                    <hr />
                    <h4>3. Informações do medicamento</h4>
                    <div className="secao">
                        <div className="block">
                            <label>Código de rastreio:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Localização atual:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Data de criação do cadastro:</label>
                            <input type="date" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Ponto de destino:</label>
                            <input type="text" placeholder="" />
                        </div>
                        <div className="block">
                            <label>Status:</label>
                            <input type="text" placeholder="" />
                        </div>
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
            <Footer />
        </>
    );
}
