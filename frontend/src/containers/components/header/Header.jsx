import "./Header.css";
import logo from "/src/assets/logo1.png";

export function Header() {
  return (
    <header>
      <section id="cabecalho">
        <img id="logo" src={logo} alt="logo da empresa" />
      </section>
    </header>
  );
}
