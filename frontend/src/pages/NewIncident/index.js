import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import api from '../../services/api';
import './styles.scss';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push('/profile');
    } catch(err) {
      alert('Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero"/>
          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói que ajude a resolve-lo.</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={ 16 } color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={ handleNewIncident }>
          <input type="text" value={ title } onChange={ e => setTitle(e.target.value) } placeholder="Título do Caso" />
          <textarea value={ description } onChange={ e => setDescription(e.target.value) } placeholder="Descrição" />
          <input type="text" value={ value } onChange={ e => setValue(e.target.value) } placeholder="Valor em Reais" />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}