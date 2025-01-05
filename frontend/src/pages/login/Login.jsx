import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Login.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const salvetoken = (newToken) => {
    localStorage.setItem("token", newToken);
  };

  const loginMutation = useMutation(
    (loginData) =>
      axios.post("http://localhost:3000/api/v1/users/login", loginData),
    {
      onSuccess: (response) => {
        salvetoken(response.data.token);
        setError(null);

        navigate("/tracking-adm");
      },
      onError: (error) => {
        console.error(
          "Erro ao fazer login:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.message || "Erro ao fazer login.");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      cpf,
      cnpj,
      password,
    };

    loginMutation.mutate(loginData);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="fundo">
        <form className="login" onSubmit={handleSubmit}>
          <h3>Login do administrador</h3>
          <section className="inputsLogin">
            <label>
              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="CNPJ da empresa"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </section>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <nav className="links">
            <a id="init" href="">
              Esqueceu a senha?
            </a>
            <a id="final" href="/register">
              Não tem uma conta?
            </a>
          </nav>
          <button type="submit" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? "Carregando..." : "Sign in"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
