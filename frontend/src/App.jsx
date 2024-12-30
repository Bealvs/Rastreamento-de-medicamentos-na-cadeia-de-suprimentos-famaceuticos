import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/login/Login";
import Register from "./containers/registerAdm/Register";
import TrackingUser from "./containers/trackingUser/TrackingUser";
import ResultUser from "./containers/resultrackingUser/ResultUser";
import TrackingAdm from "./containers/trackingAdm/TrackingAdm";
import ResultAdm from "./containers/resultranckingAdm/ResultAdm";
import Sidebar from "./containers/components/sidebar/Sidebar";

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
        <Route path="/login" element={<Login />} />
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
