import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';

export default function Home() {

    const[users, setUsers] = useState([]);
    const {id} = useParams();

    useEffect( () => {
        loadUsuarios();
    }, [])

    const loadUsuarios = async ()=> {
        const result = await axios.get("http://localhost:8080/usuarios");
        console.log(result.data);
        setUsers(result.data);
    }

    const excluirUsuario = async (id) =>{
        await axios.delete(`http://localhost:8080/usuarios/${id}`)
        loadUsuarios();
    }

    return (
        <div classNameName="conteiner">
            <div classNameName="py-4">
                <table className="table border">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">CEP</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">UF</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user,index) => (
                                <tr>
                                    <th scope="row" key={index}>
                                        {index + 1}
                                    </th>
                                    <td>{user.cep}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.estado}</td>
                                    <td>
                                        <Link className="btn btn-primary mx-2" to={`/detalhes/${user.id}`}>Visualizar</Link>
                                        <Link className="btn btn-outline-primary mx-2" 
                                        to={`/editarUsuario/${user.id}`}>Editar 
                                        </Link>
                                        <button className="btn btn-danger mx-2" onClick={() => excluirUsuario(user.id)}>Deletar</button>
                                    </td>
                                    
                                </tr>
                        ))

                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
