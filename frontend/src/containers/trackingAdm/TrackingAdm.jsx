import "./TrackingAdm.css";
import { Header } from "../components/header/Header";
import SidebarAdm from "../components/sidebarAdm/SidebarAdm";
import { Footer } from "../components/footer/Footer";

function TelaBuscar() {
  return (
    <div className="content-Adm">
      <div className="form-container-Adm">
        <h1>Digite o código para rastreio do medicamento</h1>
        <form>
          <input type="text" placeholder="ex.:ABC00000000000" />
          <button type="submit">Rastrear</button>
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
        <TelaBuscar />
      </div>
      <Footer />
    </div>
  );
}

export default TrackingAdm;
