import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from './pages/login/Login'
import { Cadastromed } from './pages/Cadastromedicamento/Cadastromed';
import { Atualizacaomed } from './pages/Atualizacaomed/Atualizacaomed';
import { Atualizacaoid } from './pages/atualizacaoid/Atualizacaoid';
import { Historico } from './pages/historico/Historico';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/CadastroMedicamentos" element={<Cadastromed></Cadastromed>} />
      <Route path="/atualizacaomed/rastreio" element={<Atualizacaomed></Atualizacaomed>} />
      <Route path="/atualizacaomed/rastreio/id" element={<Atualizacaoid></Atualizacaoid>} />
      <Route path="/historico" element={<Historico></Historico>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
