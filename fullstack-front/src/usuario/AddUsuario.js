import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';  

export default function AddUsuario() {

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

  let navigate = useNavigate();

  const { nome, cep, cpf, logradouro, bairro, estado, cidade } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      let cpfFormatado = value.replace(/\D/g, ""); 
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setUser({ ...user, cpf: cpfFormatado }); 
    }else{
      setUser({ ...user, [name]: value });
    } 
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validaCampos(); 

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      return;
    }

    try {
      await axios.post("http://localhost:8080/usuarios", user);
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const buscarCep = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/usuarios/buscarCep/${cep}`);
      const data = response.data;

      if (data.erro) {
        setErrors({ cep: "CEP não encontrado." });
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


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-2">Registrar</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <input type={"text"} value={cep} onChange={handleChange} onBlur={buscarCep} name="cep" className="form-control" placeholder="Digite seu CEP" maxLength="8"/>
              {errors.cep && <small className="text-danger">{errors.cep}</small>}
            </div>
            <div className="mb-3">
              <input type={"text"} value={nome} onChange={handleChange} name="nome" className="form-control" placeholder="Digite seu nome" />
              {errors.nome && (
                <small className="text-danger">{errors.nome}</small>
              )}
            </div>
            <div className="mb-3">
              <input type={"text"} value={cpf} onChange={handleChange} name="cpf" className="form-control" placeholder="Digite seu CPF" maxLength="14" />
              {errors.cpf && <small className="text-danger">{errors.cpf}</small>}
            </div>
            <div className="mb-3">
              <input type={"text"} value={logradouro} onChange={handleChange} name="logradouro" className="form-control" placeholder="Logradouro" disabled="true" />
              {errors.logradouro && (
                <small className="text-danger">{errors.logradouro}</small>
              )}
            </div>
            <div className="mb-3">
              <input type={"text"} value={bairro} onChange={handleChange} name="bairro" className="form-control" placeholder="Bairro" disabled="true"  />
              {errors.bairro && (
                <small className="text-danger">{errors.bairro}</small>
              )}
            </div>
            <div className="mb-3">
              <input type={"text"} value={estado} onChange={handleChange} name="estado" className="form-control" placeholder="Estado" disabled="true"  />
              {errors.estado && (
                <small className="text-danger">{errors.estado}</small>
              )}
            </div>
            <div className="mb-3">
              <input type={"text"} value={cidade} onChange={handleChange} name="cidade" className="form-control" placeholder="Cidade" disabled="true"  />
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
