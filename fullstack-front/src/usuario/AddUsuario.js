import React, { useState } from 'react'

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


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-2">Registrar</h2>
          <form>
            <div className="mb-3">
              <input type={"text"} value={cep} onChange={handleChange}  name="cep" className="form-control" placeholder="Digite seu CEP" />
            </div>
            <div className="mb-3">
              <input type={"text"} value={nome} onChange={handleChange} name="nome" className="form-control" placeholder="Digite seu nome" />
            </div>
            <div className="mb-3">
              <input type={"text"} value={cpf} onChange={handleChange} name="cpf" className="form-control" placeholder="Digite seu CPF"  />
            </div>
            <div className="mb-3">
              <input type={"text"} value={logradouro} onChange={handleChange} name="logradouro" className="form-control" placeholder="Logradouro"  />
            </div>
            <div className="mb-3">
              <input type={"text"} value={bairro} onChange={handleChange} name="bairro" className="form-control" placeholder="Bairro"ß  />
            </div>
            <div className="mb-3">
              <input type={"text"} value={estado} onChange={handleChange} name="estado" className="form-control" placeholder="Estado"   />
            </div>
            <div className="mb-3">
              <input type={"text"} value={cidade} onChange={handleChange} name="cidade" className="form-control" placeholder="Cidade"  />
            </div>
            <button type="submit" className="btn btn-outline-primary">Adicionar</button>
            <button type="submit" className="btn btn-danger mx-2" >Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
