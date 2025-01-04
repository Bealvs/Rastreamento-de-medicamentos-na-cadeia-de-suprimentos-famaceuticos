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
      <Link className="menu-item" to="/">
        Login
      </Link>

      <Link className="menu-item" to="/register">
        Cadastro ADM
      </Link>

      <Link className="menu-item" to="/tracking-user">
        Rastreio
      </Link>
    </Menu>
  );
}
