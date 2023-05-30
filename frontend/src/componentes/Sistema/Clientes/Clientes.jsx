import React, { useEffect, useState} from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './Clientes.css'
import Button from 'react-bootstrap/Button'
import Navbar from '../NavbarUser'
import { useNavigate} from 'react-router-dom';

function Clientes() {
    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);
    const [tablaClientes, setTablaClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    //conexion por axios hacia la url del backend para obtener los clientes
    const peticionesGet= async()=>{
        await axios.get('http://localhost:4000/clientes-get')
        .then(response=>{
            setClientes(response.data);
            setTablaClientes(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaClientes.filter((elemento)=>{
            if(elemento.nombres.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.apellidos.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return(elemento);
            }
        });
        setClientes(resultadosBusqueda);
    }

    useEffect(()=>{
        peticionesGet();
    },[])

  return (
    <div className="cliente">
        <Navbar />
        <div className='cliente-cont'>
            <div className='tit'>Clientes</div>
            <div className='nuevo-cliente'>
                <Button onClick={() =>{ navigate("/Clientes/create") }} variant="success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>Nuevo Cliente
                </Button>
            </div>
            <div className='containerInput'>
                <input
                className='form-control inputBuscar'
                value={busqueda}
                placeholder='Búsqueda por nombre'
                onChange={handleChange}
                />
            <Button className='btn btn-succes' variant="warning">
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
            </div>
            <div className='table-response'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <th>CODIGO</th>
                        <th>NOMBRES</th>
                        <th>APELLIDOS</th>
                        <th>EMAIL</th>
                        <th>DPI</th>
                        <th>DIRECCION</th>
                        <th>ACCIONES</th>
                    </thead>
                    <tbody>
                        {clientes &&
                        clientes.map((cliente)=>(
                            <tr key={cliente.id}>
                                <td>{cliente.codigo}</td>
                                <td>{cliente.nombres}</td>
                                <td>{cliente.apellidos}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.dpi}</td>
                                <td>{cliente.direccion}</td>
                                <td>
                                    <Button onClick={() =>{ navigate("/Clientes/edit")}} variant={"primary"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>Editar
                                    </Button>
                                    <Button variant="danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default Clientes;