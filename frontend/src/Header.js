import React from 'react'; // Essa importação é importante sempre que eu vá utilizar um html no meio do js, mesmo que eu não vá utilizar;

// export default function Header(props) {
export default function Header({ children }) { // Desestruturando as propiedades para saber exatamente o que estou recebendo
  return(
    <header>
      <h1>{ children }</h1>
    </header>
  );
}