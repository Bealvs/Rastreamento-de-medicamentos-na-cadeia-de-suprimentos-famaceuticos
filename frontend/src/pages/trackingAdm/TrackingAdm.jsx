import "./TrackingAdm.css";
import { Header } from "../../components/header/Header";
import SidebarAdm from "../../components/sidebarAdm/SidebarAdm";
import { Footer } from "../../components/footer/Footer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TelaBusca() {
  const [TrackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const TrackingMutation = useMutation(
    (TrackingData) =>
      axios.get(
        `http://localhost:3000/api/v2/products/tracking/${TrackingData.TrackingCode}`
      ),
    {
      onSuccess: (response) => {
        console.log(
          "Requisição bem-sucedida! Resposta do servidor:",
          response.data
        );
        setError(null);

        navigate("/result-adm", { state: { trackingData: response.data } });
      },
      onError: (error) => {
        console.error(
          "Erro ao fazer o rastreio:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || "Erro ao fazer o rastreio.");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const TrackingData = {
      TrackingCode,
    };

    TrackingMutation.mutate(TrackingData);
  };

  return (
    <div className="contents">
      <div className="form-containers">
        <h1>Digite o código para rastreio do medicamento</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="ex.:ABC00000000000"
              value={TrackingCode}
              onChange={(e) => {
                setTrackingCode(e.target.value);
              }}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={TrackingMutation.isLoading}>
            {TrackingMutation.isLoading ? "Carregando..." : "Rastrear"}
          </button>
        </form>
      </div>
    </div>
  );
}

function TrackingAdm() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <SidebarAdm />
        <TelaBusca />
      </div>
      <Footer />
    </div>
  );
}

export default TrackingAdm;
