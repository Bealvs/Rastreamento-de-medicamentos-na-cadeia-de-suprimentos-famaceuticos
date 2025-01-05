import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import './Cadastromed.css'
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axios from "axios"; 
import { InputMask } from '@react-input/mask';

export function Cadastromed() {
    axios.defaults.headers.common = {'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4ZjZmM2E1LTZjMmEtNDZmYi04NzZkLTNiNDZmMjIxNmI0YiIsImlhdCI6MTczNjEwNjYyNCwiZXhwIjoxNzM2MTkzMDI0fQ.Kp6_FHVyrUXkZA7YOySyHVF6Pte8XD30f3R8czbNu8c`, 'Content-Type': 'application/json'}

    const [response, setResponse] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");

    const {mutate, isError, isSuccess} = useMutation({
    mutationFn: (formDados)=> axios.post("http://localhost:3000/api/v1/products/", formDados),
    onSuccess: 
         (res) => { setResponse(res)
         setAlertMessage("Dados cadastrados com sucesso!");
         console.log(res.data)
    },
    onError: (error) => {
        console.error("Erro detalhado:", error.response?.data || error.message);
        setResponse(error.response?.data || error.message);
        setAlertMessage("Ocorreu um erro! Os dados não foram cadastrados! ",  res.response?.data );
      },
      
  })

    const [formDados, setformDados] = useState(
        { 
            productCode: "", 
            commercialName: "", 
            genericName: "", 
            characteristics: "",
            dangerLevel: "low",
            batch: "",
            manufacturingDate: "",
            expirationDate: "",
            status: "produced",
            manufacturerName: "",
            cnpj: "",
            tradeName: "",
            trackingCode: "",
            destinationPoint: "",
            location: "",  
            event: "Produto postado" 
          }
    );
    const handleSubmit = (e) => {
        e.preventDefault(); 
        mutate(formDados);
      };

      let dataAtual = new Date(); 
      let dataPosterior = new Date();
      dataPosterior.setDate(dataPosterior.getDate() + 1);
      dataPosterior = dataPosterior.toISOString().split('T')[0];
      dataAtual = dataAtual.toISOString().split('T')[0];

      useEffect(() => {
        if (alertMessage) {
            alert(alertMessage); 
            setAlertMessage(""); 
            if (isSuccess) {
                window.location.reload(); 
            }
            if (isError){
                window.location.reload(); 
            }
        }
    }, [alertMessage, isSuccess]);
    return (
        <>
            <Header />
            <SidebarAdm/>
            <div className="fundoCadastro">
            <form className="cadastro" onSubmit={handleSubmit}>
                    <h2>Cadastro de medicamento</h2>
                    <h4>1. Informações do medicamento</h4>
                    <div className="secao">
                        <div className="block">
                            <label>Nome comercial:</label>
                            <input 
                                type="text" 
                                placeholder=""
                                minLength={3}
                                maxLength={150} 
                                value={formDados.commercialName} 
                                onChange={(e) => setformDados({ ...formDados, commercialName: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Nome genérico:</label>
                            <input 
                                type="text" 
                                placeholder=""
                                minLength={3}
                                maxLength={150} 
                                value={formDados.genericName} 
                                onChange={(e) => setformDados({ ...formDados, genericName: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Características do produto:</label>
                            <input 
                                type="text" 
                                placeholder="" 
                                minLength={1}
                                value={formDados.characteristics} 
                                onChange={(e) => setformDados({ ...formDados, characteristics: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Código de identificação do produto:</label>
                            <input 
                                type="text" 
                                placeholder="" 
                                minLength={4}
                                maxLength={15}
                                value={formDados.productCode} 
                                onChange={(e) => setformDados({ ...formDados, productCode: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Lote:</label>
                            <input 
                                type="text" 
                                placeholder=""
                                minLength={1}
                                maxLength={50}
                                value={formDados.batch} 
                                onChange={(e) => setformDados({ ...formDados, batch: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Data de fabricação:</label>
                            <input 
                                type="date" 
                                placeholder="" 
                                max={dataAtual}
                                value={formDados.manufacturingDate} 
                                onChange={(e) => setformDados({ ...formDados, manufacturingDate: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Data de validade:</label>
                            <input 
                                type="date" 
                                placeholder=""
                                min={dataPosterior}
                                value={formDados.expirationDate} 
                                onChange={(e) => setformDados({ ...formDados, expirationDate: e.target.value })} 
                            />
                        </div>
                    </div>
                    <hr />
                    <h4>2. Informações do fabricante</h4>
                    <div className="secao">
                        <div className="block">
                            <label>Nome do fabricante:</label>
                            <input 
                                type="text" 
                                placeholder="" 
                                minLength={3}
                                maxLength={150}
                                value={formDados.manufacturerName} 
                                onChange={(e) => setformDados({ ...formDados, manufacturerName: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Nome comercial:</label>
                            <input 
                                type="text" 
                                placeholder="" 
                                minLength={3}
                                maxLength={150}
                                value={formDados.tradeName} 
                                onChange={(e) => setformDados({ ...formDados, tradeName: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>CNPJ:</label>
                            <InputMask mask="__.___.___/____-__" 
                                replacement={{ _: /\d/ }}
                                type="text" 
                                placeholder=""
                                maxLength={18} 
                                value={formDados.cnpj} 
                                onChange={(e) => setformDados({ ...formDados, cnpj: e.target.value })}
                                pattern="^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$" required 
                            />
                        </div>
                    </div>
                    <hr />
                    <h4>3. Informações do rastreamento</h4>
                    <div className="secao">
                        <div className="block">
                            <label>Código de rastreio:</label>
                            <input 
                                type="text" 
                                placeholder=""
                                minLength={10} 
                                maxLength={30}
                                value={formDados.trackingCode} 
                                onChange={(e) => setformDados({ ...formDados, trackingCode: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Localização atual:</label>
                            <input 
                                type="text" 
                                placeholder=""
                                minLength={3}
                                maxLength={150} 
                                value={formDados.location} 
                                onChange={(e) => setformDados({ ...formDados, location: e.target.value })} 
                            />      
                        </div>
                        <div className="block">
                            <label>Localização por status:</label>
                            <select name="status" id="infos" onChange={(e) => setformDados({ ...formDados, event: e.target.value })}>
                                    <option value="Produto postado">Produto postado</option>
                            </select>   
                        </div>
                        <div className="block">
                            <label>Ponto de destino:</label>
                            <input 
                                type="text" 
                                placeholder="" 
                                minLength={3}
                                maxLength={150}
                                value={formDados.destinationPoint} 
                                onChange={(e) => setformDados({ ...formDados, destinationPoint: e.target.value })} 
                            />
                        </div>
                        <div className="block">
                            <label>Status do produto:</label>
                            <select name="danger" id="option" onChange={(e) => setformDados({ ...formDados, status: e.target.value })}>
                                <option value="produced">Produced</option>
                                <option value="inspected" >Inspected</option>
                                <option value="in transit" >In transit</option>
                                <option value="delivered" >Delivered</option>
                            </select>
                        </div>
                        <div className="block">
                            <label>Nivel de risco:</label>
                            <select name="danger" id="option" onChange={(e) => setformDados({ ...formDados, dangerLevel: e.target.value })}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>

            </div>
            <Footer />
        </>
    );
}
