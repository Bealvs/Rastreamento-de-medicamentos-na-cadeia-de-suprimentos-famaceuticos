import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import './Atualizacaomed.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Atualizacaomed(){

    const navigate = useNavigate();
    const [trackingCode, setTrackingCode] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault(); 
        navigate(`/atualizacaomed/rastreio/${trackingCode}`)
    };
    return (
        <>
        <Header />
        <SidebarAdm/>
            <div className="fundoAtualiza1">
                <form className="rastreio" onSubmit={handleSubmit}>
                    <h3>Informe o código de rastreio:</h3>
                    <input type="text" placeholder="Código de rastreio:" onChange={(e) => setTrackingCode(e.target.value)}/>
                    <button type="submit" >Buscar</button>

                </form>
            </div>
        <Footer />
        </>
    );

}