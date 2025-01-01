import React, { useEffect } from "react";
import "./SidebarAdm.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

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
      <Link className="menu-item" to ="/tracking-adm">
        Rastrear
      </Link>

      <Link className="menu-item" to ="/CadastroMedicamentos">
        Cadastro de medicamento
      </Link>

      <Link className="menu-item" to ="/atualizacaomed/rastreio">
        Atualizar
      </Link>

      <Link className="menu-item" to ="/historico">
        Histórico
      </Link>
    </Menu>
  );
}
