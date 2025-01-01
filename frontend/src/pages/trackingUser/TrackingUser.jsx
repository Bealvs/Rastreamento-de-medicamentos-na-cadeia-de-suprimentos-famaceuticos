import "./TranckingUser.css";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Footer } from "../../components/footer/Footer";

function TelaBusca() {
  return (
    <div className="contents">
      <div className="form-containers">
        <h1>Digite o código para rastreio do medicamento</h1>
        <form>
          <input type="text" placeholder="ex.:ABC00000000000" />
          <button type="submit">Rastrear</button>
        </form>
      </div>
    </div>
  );
}

function TrackingUser() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <TelaBusca />
      </div>
      <Footer />
    </div>
  );
}

export default TrackingUser;
