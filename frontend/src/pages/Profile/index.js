import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import api from '../../services/api';
import './styles.scss';

export default function Profile() {
  const [incidents, setIncidents] = useState([]); // Valor inicial vazio.
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);// Primeiro parâmetro é a função que deve ser chamada e o segundo é quando essa função deve ser chamada. No array eu observo um item e toda vez que ele muda seu chamo a função. Neste caso que eu só quero que a função seja executado uma vez o array fica vazio; Neste caso colocamos o id como dependência para o caso se mudar atualizar.

  async function handleDeleteIncident(id) { // O Instrutor usa o prefixo handle para denotar ações do usuário.
    try {
      await api.delete(`incidents/${ id }`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={ logoImg } alt="Be The Hero"/>
        <span>Bem vindx { ongName }</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={()=> handleLogout() }>
          <FiPower size={ 18 } color="#E02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        { incidents.map(incident => ( // Como estou restornando um valor direto coloco ons itens entre parênteses, se colocasse entre chaves precisaria dar return
          <li key={ incident.id }>
          <strong>CASO:</strong>
          <p>{ incident.title }</p>
          <strong>DESCRIÇÃO:</strong>
          <p>{ incident.description }</p>
          <strong>VALOR:</strong>
          <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>
          {/* Para passar uma função e não o retorno dela utilizo uma arrow function criando uma nova função, caso contrário ela será chamada assim que o componente for renderizado. */}
          <button type="button" onClick={()=> handleDeleteIncident(incident.id) }>
            <FiTrash2 size={ 20 } color="#A8A8B3" />
          </button>
        </li>
        )) }
      </ul>
    </div>
  );
}