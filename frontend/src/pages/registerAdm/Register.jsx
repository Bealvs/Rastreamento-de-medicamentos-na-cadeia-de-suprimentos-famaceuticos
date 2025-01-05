import "./Register.css";
import { Header } from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Footer } from "../../components/footer/Footer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

function TelaCadastro() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation(
    (newUser) => axiosInstance.post("/users/register", newUser),
    {
      onSuccess: () => {
        setSuccess(true);
        setError(null);
      },
      onError: (error) => {
        console.error("Erro detalhado:", error.response?.data);
        setError(error.response?.data?.message || "Erro ao registrar.");
        setSuccess(false);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      name: formData.get("name"),
      cpf: formData.get("cpf"),
      cnpj: formData.get("cnpj"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Dados enviados:", newUser);

    if (newUser.email !== formData.get("confirmEmail")) {
      setError("Os emails não coincidem.");
      return;
    }
    if (newUser.password !== formData.get("confirmPassword")) {
      setError("As senhas não coincidem.");
      return;
    }

    mutation.mutate(newUser);
  };

  return (
    <div className="content">
      <div className="form-container">
        <h1>Cadastro do administrador</h1>
        {success && (
          <p style={{ color: "green" }}>Usuário registrado com sucesso!</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Nome completo" required />
          <input name="cpf" type="text" placeholder="CPF" required />
          <input name="cnpj" type="text" placeholder="CNPJ" required />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="confirmEmail"
            type="email"
            placeholder="Confirmar email"
            required
          />
          <input name="password" type="password" placeholder="Senha" required />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
            required
          />
          <a href="/login">Já possui uma conta?</a>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Registrando..." : "Sign up"}
          </button>
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
