import React, { useEffect } from "react";
import "./SidebarAdm.css";
import { slide as Menu } from "react-burger-menu";

export default function SidebarAdm({ menuItems }) {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    return () => document.body.classList.remove("sidebar-open");
  }, [isOpen]);

  return (
    <Menu
      right
      isOpen={isOpen}
      onStateChange={(state) => setIsOpen(state.isOpen)}
    >
      <a className="menu-item" href="/tracking-adm">
        Rastrear
      </a>

      <a className="menu-item" href="/CadastroMedicamentos">
        Cadastro de medicamento
      </a>

      <a className="menu-item" href="/atualizacaomed/rastreio">
        Atualizar
      </a>

      <a className="menu-item" href="/historico">
        Histórico
      </a>
    </Menu>
  );
}
