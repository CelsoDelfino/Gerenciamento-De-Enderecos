import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios'

export default function DetalhesUsuario() {
    
    const[user, setUser] = useState({
         cep: "",
         nome:"",
         cpf:"",
         logradouro:"",
         bairro:"",
         cidade:"",
         estado:""
    })

    const {id} = useParams()

    useEffect( () => {
        loadUser()
    }, [])

    const loadUser = async () =>{
        const result = await axios.get(`http://localhost:8080/usuarios/${id}`)
        setUser(result.data)
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-2">Detalhes</h2>

                    <div className="card">
                        <div className="card-header">
                            <ul className="list-group list-group-flush">
                                <b>Cep:</b>
                                {user.cep}
                            </ul>
                            <ul className="list-group list-group-flush">
                                <b>Nome:</b>
                                {user.nome}
                            </ul>
                            <ul className="list-group list-group-flush">
                                <b>CPF:</b>
                                {user.cpf}
                            </ul>
                            <ul className="list-group list-group-flush">
                                <b>Logradouro:</b>
                                {user.logradouro}
                            </ul>
                            <ul className="list-group list-group-flush">
                                <b>Bairro:</b>
                                {user.bairro}
                            </ul>
                            <ul className="list-group list-group-flush">
                                <b>Cidade:</b>
                                {user.cidade}
                            </ul>
                            <ul className="list-group list-group-flush">
                                <b>Estado:</b>
                                {user.estado}
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>Voltar</Link>
                </div>
            </div>
        </div>
    )
}
