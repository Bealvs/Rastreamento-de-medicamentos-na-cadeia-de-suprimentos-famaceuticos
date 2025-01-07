import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import {Lock} from "lucide-react"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import './Atualizacaoid.css'
import { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

export function Atualizacaoid(){

    const token = localStorage.getItem("token");
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`, 'Content-Type': 'application/json'}
    let {trackingCode} = useParams();
    const {data, error, isLoading, isFetched} = useQuery({
        queryKey: ["product", trackingCode],
        queryFn: () => axios.get(`http://localhost:3000/api/v2/products/tracking/${trackingCode}`).then((res) => res.data),
    }); 
    let ultimaAtualizacao = {  
        location: "",
        event: "", 
        trackingCode: "", 
        destinationPoint: "" };
    const[response, setResponse] = useState("")
    const [alertMessage, setAlertMessage] = useState("");
    const [trackDados, settrackDados] = useState(
        {
            location: "",
            event: "",
            trackingCode: "",
            destinationPoint: ""
        });
    const {mutate, isError, isSuccess} = useMutation({
        mutationKey: ["tracking", trackingCode],
        mutationFn: (trackDados)=> axios.post(`http://localhost:3000/api/v2/products/tracking/${trackingCode}`, trackDados),
        onSuccess: 
             (res) => { setResponse(res)
             setAlertMessage("Dados cadastrados com sucesso!");
        },
        onError: (error) => {
            console.log("Erro detalhado:", error.response?.data || error.message);
            setResponse(error.response?.data || error.message);
            setAlertMessage("Ocorreu um erro!");
          },
          
      })

    const handleSubmit = (e) => {
        e.preventDefault(); 
        mutate(trackDados);
    };

    useEffect(() => {
        if (alertMessage) {
            alert(alertMessage); 
            setAlertMessage(""); 
            if (isSuccess) {
                window.location.reload(true);
            }
            if (isError){ 
            }
        }
    }, [alertMessage, isSuccess]);
    
    useEffect(() => {
        if (data && data.trackings) {
            const ultimaAtualizacao = Array.isArray(data.trackings) ? data.trackings[data.trackings.length - 1] : data.trackings;
            settrackDados({
                location: ultimaAtualizacao.location || "",
                event: ultimaAtualizacao.event || "Produto postado",
                trackingCode: ultimaAtualizacao.trackingCode || "",
                destinationPoint: ultimaAtualizacao.destinationPoint || "",
            });
        }
    }, [data]);
    
  
    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os dados: {JSON.stringify(error)}</p>;
    return (
        <>
        <Header />
        <SidebarAdm/>
            <div className="fundoAtualiza2">
                <form className="alteracao" onSubmit={handleSubmit}>
                {( 
                        <div className="alterainputs">
                            <div className="info">
                            <label>Código de rastreio: <Lock className="cadeado"/></label> 
                            <input type="text" value = {trackDados.trackingCode} disabled/>
                            </div>
                            <div className="info">
                                <label>Ponto de destino: <Lock className="cadeado"/> </label>
                                <input type="text" value = {trackDados.destinationPoint} disabled />
                                </div>
                            <div className="info">
                                <label>Localização atual:</label>
                                <input type="text" placeholder="" minLength={3} maxLength={150} value={trackDados.location} onChange={(e) => settrackDados({ ...trackDados, location: e.target.value })} />
                            </div>
                            <div className="info">
                            <label>Status atual:</label>
                                <select name="status" value={trackDados.event} id="infos" onChange={(e) => settrackDados({ ...trackDados, event: e.target.value })}>
                                    <option value="Produto em inspeção" >Produto em inspeção</option>
                                    <option value="Produto em transporte" >Produto em transporte</option>
                                    <option value="Produto entregue" >Produto entregue</option>
                                </select>
                            </div>
                        </div>
                )};
                        <button type="submit">Atualizar</button>
                </form>
            </div>
        <Footer />
        </>
    );

}