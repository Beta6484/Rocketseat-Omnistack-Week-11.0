import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import api from '../../services/api';
import './styles.scss';

export default function Register() {
  const [name, setName] = useState(''); // Primeiro parametro armazena o valor e o segundo é a função que atualiza o valor, passando valor vazio para início do formulário.
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = { name, email, whatsapp, city, uf };

    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${ response.data.id }`);
      history.push('/');
    } catch(err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={ 16 } color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={ handleRegister }>
          <input type="text" value={ name } onChange={ e => setName(e.target.value) } placeholder="Nome da ONG" />
          <input type="email" value={ email } onChange={ e => setEmail(e.target.value) } placeholder="E-Mail" />
          <input type="text" value={ whatsapp } onChange={ e => setWhatsapp(e.target.value) } placeholder="WhatsApp" />
          <div className="input-group">
            <input type="text" value={ city } onChange={ e => setCity(e.target.value) } placeholder="Cidade" />
            <input type="text" value={ uf } onChange={ e => setUf(e.target.value) } placeholder="UF" style={{ width: 80 }} />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}