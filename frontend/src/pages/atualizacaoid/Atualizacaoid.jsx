import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import {Lock} from "lucide-react"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import './Atualizacaoid.css'

export function Atualizacaoid(){

    return (
        <>
        <Header />
        <SidebarAdm/>
            <div className="fundoAtualiza2">
                <form className="alteracao">
                        <div className="alterainputs">
                            <div className="info">
                            <label>Código de rastreio: <Lock className="cadeado"/></label> 
                            <input type="text" value ="Definido" disabled/>
                            </div>
                            <div className="info">
                                <label>Ponto de destino: <Lock className="cadeado"/> </label>
                                <input type="text" value ="Definido" disabled />
                            </div>
                            <div className="info">
                                <label>Localização atual:</label>
                                <input type="text" placeholder="" />
                            </div>
                            <div className="info">
                                <label>Status:</label>
                                <input type="text" placeholder="" />
                            </div>
                        </div>
                        <button type="submit">Atualizar</button>
                </form>
            </div>
        <Footer />
        </>
    );

}