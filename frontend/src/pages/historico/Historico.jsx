import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import axios from "axios"; 
import './Historico.css'
import { useQuery } from "@tanstack/react-query";

export function Historico() {

    const token = localStorage.getItem("token");
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`, 'Content-Type': 'application/json'}
    const {data, error, isLoading} = useQuery({
        queryKey: ["product"],
        queryFn: () => axios.get("http://localhost:3000/api/v2/products").then((res) => res.data),
        
    });

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    if(error){
        return <p>{error.message}</p>
    }

    return (
        <>
        <Header />
        <SidebarAdm/>
        <div className="fundoHistorico">
            <div className="Historico">
            {console.log(data)}
            {data.products.map((product) =>  <div className="quadrado">
                        <h4>Código de rastreio: {product.trackingCode}</h4>
                        <h4>Data de produção: {product.manufacturingDate}</h4>
                        <h5>Nome comercial: {product.commercialName}</h5>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
}
