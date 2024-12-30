import "./TrackingAdm.css";
import { Header } from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
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
        <Sidebar />
        <TelaBuscar />
      </div>
      <Footer />
    </div>
  );
}

export default TrackingAdm;
