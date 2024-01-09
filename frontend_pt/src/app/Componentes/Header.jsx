'use client'


import Link from "next/link";
import { useRouter } from "next/router";
const Header = () => {


    return (
      <header>
        <div className="cont_exterior">
            <div className="cont_interior">
        <a href="/">
        <section>   
            <h2>Inicio</h2>
        </section>
        </a>
        <a href='/Registros'>       
        <section>
            <h2>Agregar registros</h2>
        </section>
        </a>
        </div>
        </div>
      </header>
    )
  }

  export default Header;
  