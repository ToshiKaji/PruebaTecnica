'use client'


import { useState,useEffect } from 'react'
import axios, { Axios } from 'axios'
import Header from './Componentes/Header.jsx'
import estilos from '../../public/Estilos/estilos.css'
import Modal from './Componentes/Modal.jsx'
import { David_Libre } from 'next/font/google/index.js'
export default function Home() {

  const [empleados,setempleados]=useState(['']);
  const [empleadosfiltro,setempleadosfiltro]=useState(['']);
  const [txtfiltronombre,settxtfiltronombre]=useState('');
  const [txtfiltrodocumento,settxtfiltrodocumento]=useState('');

  const [empleado_a_editar,setempleado_a_editar]=useState('');
  const [estadomodal,setestadomodal] = useState(false)

  const[estadoeliminacion,setestadoeliminacion]= useState(true);

  const ObtenerEmpleados = () => {
    axios.get('https://localhost:7151/Empleados/Obtener').then(res => {
      setempleados(res.data)
      setempleadosfiltro(res.data)
    })

  }

  const EliminarEmpleado = (id) => {
    var APIurl='https://localhost:7151/Empleados/Eliminar'
    axios.delete(APIurl,{params:{dui_eliminar:id}}).then(res => {console.log(res)})
    

  }
  const buscador_nombre = (e) => {
    settxtfiltronombre(e.target.value)
  }

  const buscador_documento = (e) => {
    settxtfiltrodocumento(e.target.value)
  }

    let results = []
   try{
    if(!txtfiltrodocumento && !txtfiltronombre)
    { 
      results = empleados
    }
    if(!txtfiltronombre){
    results = empleados.filter((item) => 
      item.num_documento.toLowerCase().includes(txtfiltrodocumento.toLowerCase())
      )
    }
    else{
      results = empleados.filter((item) => 
      item.nombre.toLowerCase().includes(txtfiltronombre.toLowerCase())
      )
    }
   } catch (err)
   {
    console.log('Excepcion de inicio de web')
   }

   const handleabrirmodal = (empleado) => {
    setestadomodal(!estadomodal)
    setempleado_a_editar(empleado)
   }
 

  useEffect(() => {

    ObtenerEmpleados();
    
  },[estadomodal],[estadoeliminacion])




  return (
    <div className='main'>
        <Header/>
        
      
       
      
      <div className='portada'>
        <div className='input_filtros'>
          <h3>Filtros: </h3>
          <input value={txtfiltronombre}  placeholder='Nombre' type='text' onChange={buscador_nombre} />
          <input value={txtfiltrodocumento} placeholder='#Documento' onChange={buscador_documento} type='text'/>
          
        </div>
        
     <div className='tabla'>
     
      <tr className='titulo'>
        <td>Nombre</td>
        <td>Apellido</td>
        <td>Tipo de Documento</td>
        <td>Documento</td>
        <td>Fecha</td>
        <td>Pais</td>
        <td>Area</td>
        <td>Sub-area</td>
        <td>Acciones</td>
      </tr>
      { 
      results.map(empleado => {
         
         return(
      <tr>
        <td>{results?empleado.nombre:" "}</td>
        <td>{results?empleado.apellido:" "}</td>
        <td>{results?empleado.tipo_documento:" "}</td>
        <td>{results?empleado.num_documento:" "}</td>
        <td>{results?empleado.contratacion:" "}</td>
        <td>{results?empleado.pais:" "}</td>
        <td>{results?empleado.area:" "}</td>
        <td>{results?empleado.subarea:" "}</td>
        <td><div className='cell_acciones'><a className='btn_eliminar' onClick={()=>{EliminarEmpleado(empleado.num_documento),setestadoeliminacion(!estadoeliminacion)}}>Eliminar</a><a onClick={() => handleabrirmodal(empleado)} className='btn_editar'>Editar</a></div></td>
      </tr>
      )
      })}
     </div>
     

     <Modal estado={estadomodal} cambiarestado={setestadomodal} empleado_editar={empleado_a_editar}/>
      </div>
     
    </div>
  )
}
