import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import './Historico.css'

export function Historico() {
    return (
        <>
        <Header />
        <SidebarAdm/>
        <div className="fundoHistorico">
            <div className="Historico">
                <div className="quadrado">
                <h4>Código de rastreio</h4>
                <h4>Data</h4>
                <h5>Nome comercial</h5>
                </div>   
                <div className="quadrado">
                <h4>Código de rastreio</h4>
                <h4>Data</h4>
                <h5>Nome comercial</h5>
                </div>          
            </div>
        </div>
        <Footer />
        </>
    );
}
