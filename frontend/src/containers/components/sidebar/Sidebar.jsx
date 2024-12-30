import React, { useEffect } from "react";
import "./Sidebar.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default function Sidebar({ menuItems }) {
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
      <a className="menu-item" href="/login">
        Login
      </a>

      <a className="menu-item" href="/register">
        Cadastro ADM
      </a>

      <a className="menu-item" href="/tracking-user">
        Rastreio
      </a>
    </Menu>
  );
}
