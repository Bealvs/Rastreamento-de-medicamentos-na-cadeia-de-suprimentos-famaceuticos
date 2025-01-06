import "./ResultUser.css";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Footer } from "../../components/footer/Footer";
import Timeline from "../../components/timeline/Timeline";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { trackingData } = location.state || {};

  console.log("Dados recebidos na página /result-user:", trackingData);

  if (
    !trackingData ||
    !Array.isArray(trackingData) ||
    trackingData.length === 0
  ) {
    return (
      <div className="container-resultUser">
        <div className="contentUser">
          <h1>Nenhum dado de rastreio encontrado.</h1>
        </div>
      </div>
    );
  }

  const activeLabel = trackingData[trackingData.length - 1].status;
  console.log("Active Label:", activeLabel);

  return (
    <div className="container-resultUser">
      <div className="contentUser">
        <h1>Rastreio - Pedido: {trackingData[0].trackingCode}</h1>
        <Timeline activeLabel={activeLabel} />
        <div className="delivery">
          {trackingData.map((status, index) => (
            <div key={status.id} className="status">
              <h3>
                {new Date(status.timestamp).toLocaleDateString()} - {status.status}{" "}
                - {status.location}
              </h3>
              <p>
                <strong>Destino Final:</strong> {status.destinationPoint}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultUser() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Result />
      </div>
      <Footer />
    </div>
  );
}

export default ResultUser;
