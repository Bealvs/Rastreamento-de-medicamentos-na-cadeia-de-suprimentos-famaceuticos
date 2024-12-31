import "./ResultAdm.css";
import { Header } from "../components/header/Header";
import SidebarAdm from "../components/sidebarAdm/SidebarAdm";
import { Footer } from "../components/footer/Footer";
import Timeline from "../components/timeline/Timeline";

function ResultA() {
  return (
    <div className="container-resultAdm">
      <div className="contentAdm">
        <h1>Rastreio - Pedido: ABC00000000000</h1>
        <Timeline />
        <div className="deliveryAdm">
          <h3>26/12/2024 10:47 Objeto postado</h3>
          <h3>26/12/2024 10:47 Objeto postado</h3>
          <h3>26/12/2024 10:47 Objeto postado</h3>
          <h3>26/12/2024 10:47 Objeto postado</h3>
        </div>
      </div>
    </div>
  );
}

function ResultAdm() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarAdm />
        <ResultA />
      </div>
      <Footer />
    </div>
  );
}

export default ResultAdm;
