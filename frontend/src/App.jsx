import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from './pages/login/Login'
// import { Cadastromed } from './pages/Cadastromedicamento/Cadastromed'


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login></Login>} />
      {/* <Route path="/CadastroMedicamentos" element={<Cadastromed></Cadastromed>} /> */}
      </Routes>
      </BrowserRouter>
  )
}

export default App
