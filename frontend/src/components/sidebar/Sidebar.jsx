import "./Sidebar.css"
import { Link } from "react-router-dom"

export function Sidebar(){

    return(
            <aside id="side">
                <nav>
                    <Link to = "">Rastreio</Link>
                    <Link to = "/login">Login</Link>
                    <Link to = "">Cadastro</Link>
                </nav>
            </aside>
    )
}