import React from 'react';
import './global.scss';
import Routes from './routes';

function App() {
  // const [counter, setCounter] = useState(0); // retorna um array com duas posições: [valor, função de atualização]

  // function increment() {
  //   setCounter(counter + 1);
  // }

  return (
    // <Fragment>
    //   {/* <Header title="Semana OmniStack" /> // Passando uma propriedade para minha função */}
    //   {/* // Exemplo de propriedade */}
    //   <Header>Semana OmniStack</Header>
    //   {/* // Exemplo de estado */}
    // <Header>Contador: { counter }</Header>
    //   <button onClick={ increment }>Incrementar</button>
    // </Fragment>
    <Routes />
  );
}

export default App;
