import "./ResultUser.css";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Footer } from "../../components/footer/Footer";
import Timeline from "../../components/timeline/Timeline";

function Result() {
  return (
    <div className="container-resultUser">
      <div className="contentUser">
        <h1>Rastreio - Pedido: ABC00000000000</h1>
        <Timeline />
        <div className="delivery">
          <h3>26/12/2024 10:47 Objeto postado</h3>
          <h3>26/12/2024 10:47 Objeto postado</h3>
          <h3>26/12/2024 10:47 Objeto postado</h3>
          <h3>26/12/2024 10:47 Objeto postado</h3>
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
