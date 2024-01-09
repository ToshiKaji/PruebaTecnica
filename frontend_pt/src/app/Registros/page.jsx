'use client'


import { useState,useEffect } from 'react'
import axios, { Axios } from 'axios'
import Header from '../Componentes/Header.jsx'
import estilos from '../../../public/Estilos/estilos.css'


const Agregarregistros = () => {

    const[paises,setpaises]=useState([''])
    const[areas,setareas]=useState([''])
    const[subareas,setsubareas]=useState([''])

    const[nombre,setnombre]=useState('')
    const[apellido,setapellido]=useState('')
    const[pais,setpais]=useState('')
    const[area,setarea]=useState('')
    const[subarea,setsubarea]=useState('')
    const[contratacion,setconstratacion]=useState('')
    const[tipo_documento,settipo_documento]=useState('')
    const[num_documento,setnum_documento]=useState('')



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

    const Crear_registro = () =>{
        const empleadonuevo = {
            nombre:nombre,
            apellido:apellido,
            pais:pais,
            area:area,
            subarea:subarea,
            contratacion:contratacion,
            tipo_documento:tipo_documento,
            num_documento:num_documento,
          };

          console.log(empleadonuevo)

          axios.post('https://localhost:7151/Empleados/Agregar',empleadonuevo).then(res=>console.log(res))
          .catch(erro=>{console.log(erro)})





    }

        useEffect(() => {
            ObtenerAreas();
            ObtenerSubareas();
            ObtenerPaises();
            
          },[])
    
    
      

    return(
        <div className='main'>
            <Header/>
        <div className='registros'>
            <h1>Crear registro</h1>

            <div className='formulario'>
                <h2>Nombre</h2>
                <input placeholder='Nombre' type='text' onChange={inf=>setnombre(inf.target.value)}/>
                <h2>Apellido</h2>
                <input placeholder='Apellido' type='text'onChange={inf=>setapellido(inf.target.value)}/>
                <h2>Pais</h2>
                <select defaultValue='true' onChange={inf=>setpais(inf.target.value)}>
                    {paises.map(pais=>{
                        return(
                            <option value={pais.codigo}>{pais.nombre}</option>
                        
                    )})}
                </select>
                <h2>Area</h2>
                <select defaultValue='true' onChange={inf=>setarea(inf.target.value)}>
                    {areas.map(area=>{return(
                        <option value={area.id_area}>{area.nombre_area}</option>
                    )})}
                </select>
                <h2>Sub-area</h2>
                <select defaultValue='true' onChange={inf=>setsubarea(inf.target.value)}>
                        {subareas.map(subarea=>{return(
                            <option value={subarea.id_subarea}>{subarea.nombre_subarea}</option>

                        )})}
                </select>
                <h2>Tipo de Documento</h2>
                <input placeholder='Tipo de documento' type='text' onChange={inf=>settipo_documento(inf.target.value)}/>
                <h2>Numero de documento</h2>
                <input placeholder='Numero de documento' type='text' onChange={inf=>setnum_documento(inf.target.value)}/>
                <h2>Fecha de contratacion</h2>
                <input placeholder='Titulo' type='date' onChange={inf=>setconstratacion(inf.target.value)}/>
                <button onClick={Crear_registro}>Crear registro</button>
            </div>

        </div>
        </div>
    )
}

export default Agregarregistros;
