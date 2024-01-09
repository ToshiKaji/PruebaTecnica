import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const Modal = ({empleado_editar,estado,cambiarestado}) =>
{

    const[paises,setpaises]=useState([''])
    const[areas,setareas]=useState([''])
    const[subareas,setsubareas]=useState([''])

    const[nombre,setnombre]=useState(empleado_editar.nombre)
    const[apellido,setapellido]=useState(empleado_editar.apellido)
    const[pais,setpais]=useState(empleado_editar.pais)
    const[area,setarea]=useState(empleado_editar.area)
    const[subarea,setsubarea]=useState(empleado_editar.subarea)
    const[contratacion,setconstratacion]=useState(empleado_editar.contratacion)
    const[tipo_documento,settipo_documento]=useState(empleado_editar.tipo_documento)
    const[num_documento,setnum_documento]=useState(empleado_editar.num_documento)
    //inicializando
    

    const ObtenerPaises = () => {
        axios.get('https://localhost:7151/Paises/Obtener').then(res => {
          setpaises(res.data)
          
        })
    
      }

      const ObtenerAreas = () => {
        axios.get('https://localhost:7151/Areas/Obtener').then(res => {
          setareas(res.data)
          
        })
    
      }

      const ObtenerSubareas = () => {
        axios.get('https://localhost:7151/Subareas/Obtener').then(res => {
          setsubareas(res.data)
    
        })
    
      }
      
    

      const Editar_empleado = () => {

        const empleadoeditado = {
            nombre:!nombre?empleado_editar.nombre:nombre,
            apellido:!apellido?empleado_editar.apellido:apellido,
            pais:!pais?empleado_editar.pais:pais,
            area:!area?empleado_editar.area:area,
            subarea:!subarea?empleado_editar.subarea:subarea,
            contratacion:!contratacion?empleado_editar.contratacion:contratacion,
            tipo_documento:empleado_editar.tipo_documento,
            num_documento:empleado_editar.num_documento,
          };
          
         
          setnombre('')
          setapellido('')
          setpais('')
          setconstratacion('')
          settipo_documento('')
          setnum_documento('')
          setarea('')
          setsubarea('')
          
        axios.patch('https://localhost:7151/Empleados/Editar',empleadoeditado).then(res=>console.log(res))
      }

      useEffect(() => {
        ObtenerAreas();
        ObtenerSubareas();
        ObtenerPaises();
        
      },[nombre])

    return(
       <>
       {estado &&
        <div className="overlay">
        <div className="back_modal">
            <a onClick={()=> cambiarestado(!estado)} className="btn_cerrar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            </a>
            
            <div className="formulario">
                <h2>Nombre</h2>
                <input className="input" placeholder={empleado_editar.nombre} defaultValue={empleado_editar.nombre} onChange={txt=>setnombre(txt.target.value)} type="text"/>
                <h2>Apellido</h2>
                <input className="input" placeholder={empleado_editar.apellido} defaultValue={empleado_editar.apellido} onChange={txt=>setapellido(txt.target.value)} type="text"/>
                <h2>Pais</h2>
                <select className="input" defaultValue={empleado_editar.pais} onChange={val => setpais(val.target.value)}>
                    {paises.map(pais=>{
                return(    
                <option value={pais.codigo}>{pais.nombre}</option>
                )})}
                </select>
                <h2>Area</h2>
                <select className="input" defaultValue={empleado_editar.area} onChange={val => setarea(val.target.value)}>
                    
                    {areas.map(area=>{
                return(    
                <option value={area.id_area}>{area.nombre_area}</option>
                )})}
                </select> 
                <h2>Sub-area</h2>
                <select className="input" defaultValue={empleado_editar.subarea} onChange={val => setsubarea(val.target.value)}>
                    {subareas.map(subarea=>{
                return(    
                <option value={subarea.id_subarea}>{subarea.nombre_subarea}</option>
                )})}
                </select> 
                <h2>Contratacion</h2>
                <input className="input" defaultValue={empleado_editar.contratacion} onChange={res=>setconstratacion(res.target.value)} type='datetime-local'/>

                <button onClick={()=>{Editar_empleado(),cambiarestado(!estado)}}>Enviar</button>

            </div>


        </div>
        </div>
        }
        </>
    )
}

export default Modal;