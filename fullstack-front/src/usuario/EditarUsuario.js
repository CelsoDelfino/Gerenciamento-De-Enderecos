import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';  

export default function EditUsuario() {

  const [user, setUser] = useState({
    nome: "",
    cep: "",
    cpf: "",
    logradouro: "",
    bairro: "",
    estado: "",
    cidade: "",
  });

  const [errors, setErrors] = useState({});

  const {id} = useParams();

  let navigate = useNavigate();

  const { nome, cep, cpf, logradouro, bairro, estado, cidade } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validaCampos = () => {
    const newErrors = {};
    if (!user.nome.trim()) newErrors.nome = "O nome é obrigatório.";
    if (!user.cpf.trim()) newErrors.cpf = "O CPF é obrigatório.";
    if (!user.cep.trim()) newErrors.cep = "O CEP é obrigatório.";
    if (!user.logradouro.trim()) newErrors.logradouro = "O logradouro é obrigatório.";
    if (!user.bairro.trim()) newErrors.bairro = "O bairro é obrigatório.";
    if (!user.cidade.trim()) newErrors.cidade = "A cidade é obrigatória.";
    if (!user.estado.trim()) newErrors.estado = "O estado é obrigatório.";
    return newErrors;
  };


  const loadUser = async () =>{
    const result = await axios.get(`http://localhost:8080/usuarios/${id}`);
    setUser(result.data);
  }

  useEffect(() =>{
    loadUser();
  }, [])

  const buscarCep = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/usuarios/buscarCep/${cep}`);
      const data = response.data;

      if (data.erro) {
        setErrors({ cep: "CEP não encontrado" });
        return;
      }

      setUser({
        ...user,
        logradouro: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      });

      setErrors({});

    } catch (err) {
      console.error(err);
      setErrors({ cep: "CEP inválido" });
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validaCampos();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      return;
    }

    try{
      await axios.put(`http://localhost:8080/usuarios/${id}`,user)
      navigate("/")
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-2">Editar</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">Cep</label>
              <input type={"text"} value={cep} onChange={handleChange} onBlur={buscarCep} name="cep" className="form-control" placeholder="Digite seu CEP" maxLength="8"/>
              {errors.cep && <small className="text-danger">{errors.cep}</small>}
            </div>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">Nome</label>
              <input type={"text"} value={nome} onChange={handleChange} name="nome" className="form-control" placeholder="Digite seu nome" />
              {errors.nome && (
                <small className="text-danger">{errors.nome}</small>
              )}
            </div>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">CPF</label>
              <input type={"text"} value={cpf} onChange={handleChange} name="cpf" className="form-control" placeholder="Digite seu CPF" />
              {errors.cpf && <small className="text-danger">{errors.cpf}</small>}
            </div>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">Logradouro</label>
              <input type={"text"} value={logradouro} onChange={handleChange} name="logradouro" className="form-control" placeholder="Logradouro" disabled="true"/>
              {errors.logradouro && (
                <small className="text-danger">{errors.logradouro}</small>
              )}
            </div>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">Bairro</label>
              <input type={"text"} value={bairro} onChange={handleChange} name="bairro" className="form-control" placeholder="Bairro" disabled="true" />
              {errors.bairro && (
                <small className="text-danger">{errors.bairro}</small>
              )}
            </div>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">Estado</label>
              <input type={"text"} value={estado} onChange={handleChange} name="estado" className="form-control" placeholder="Estado" disabled="true"/>
              {errors.estado && (
                <small className="text-danger">{errors.estado}</small>
              )}
            </div>
            <div className="mb-3 text-start">
            <label htmlFor="Nome" className="form-label">Cidade</label>
              <input type={"text"} value={cidade} onChange={handleChange} name="cidade" className="form-control" placeholder="Cidade" disabled="true" />
              {errors.cidade && (
                <small className="text-danger">{errors.cidade}</small>
              )}
            </div>
            <button type="submit" className="btn btn-outline-primary">Adicionar</button>
            <Link type="submit" className="btn btn-danger mx-2" to="/">Cancelar</Link>
          </form>
        </div>

      </div>

    </div>
  )
}
