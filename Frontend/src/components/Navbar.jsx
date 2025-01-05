import React from 'react'
import { Link } from "react-router-dom"
import "./navbar.css";

function Navbar() {
    return (
        <nav>
            <Link to={"/"}>
                <div>
                    <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="github logo" />
                    <h3>GiHub</h3>
                </div>
            </Link>

            <div>
               <Link to={"/create"}>
                <p>+ Create Repo</p>
               </Link>

               <Link to={"/profile"}>
                <p>Profil</p>
               </Link>
            </div>
        </nav>
    )
}

export default Navbar