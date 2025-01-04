import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { Cadastromed } from "./pages/cadastromedicamento/Cadastromed";
import { Atualizacaomed } from "./pages/atualizacaomed/Atualizacaomed";
import { Atualizacaoid } from "./pages/atualizacaoid/Atualizacaoid";
import { Historico } from "./pages/historico/Historico";
import Register from "./pages/registerAdm/Register";
import TrackingUser from "./pages/trackingUser/TrackingUser";
import TrackingAdm from "./pages/trackingAdm/TrackingAdm";
import ResultUser from "./pages/resultrackingUser/ResultUser";
import ResultAdm from "./pages/resultranckingAdm/ResultAdm";
import Sidebar from "./components/sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/atualizacaomed/rastreio"
          element={<Atualizacaomed></Atualizacaomed>}
        />
        <Route
          path="/atualizacaomed/rastreio/id"
          element={<Atualizacaoid></Atualizacaoid>}
        />
        <Route path="/historico" element={<Historico></Historico>} />
        <Route
          path="/CadastroMedicamentos"
          element={<Cadastromed></Cadastromed>}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/tracking-user" element={<TrackingUser />} />
        <Route path="/result-user" element={<ResultUser />} />
        <Route
          path="/tracking-adm"
          element={
            <Layout>
              <TrackingAdm />
            </Layout>
          }
        />
        <Route
          path="/result-adm"
          element={
            <Layout>
              <ResultAdm />
            </Layout>
          }
        />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
