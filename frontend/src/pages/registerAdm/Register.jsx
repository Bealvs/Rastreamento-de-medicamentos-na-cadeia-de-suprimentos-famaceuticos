import "./Register.css";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Footer } from "../../components/footer/Footer";

function TelaCadastro() {
  return (
    <div className="content">
      <div className="form-container">
        <h1>Cadastro do administrador</h1>
        <form>
          <input type="text" placeholder="Nome completo" />
          <input type="text" placeholder="CPF" />
          <input type="text" placeholder="CNPJ" />
          <input type="email" placeholder="Email" />
          <input type="email" placeholder="Confirmar email" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirmar senha" />
          <a href="/">Já possui uma conta?</a>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <TelaCadastro />
      </div>
      <Footer />
    </div>
  );
}

export default Register;
