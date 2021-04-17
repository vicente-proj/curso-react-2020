import './App.css';
import React from 'react';

/*function ComponenteFuncional() {
  return (
    <h1>
    Hello world
    </h1>
  );
}*/

class App extends React.Component{

  state = {
       nome : ''
  }

   /*constructor(){
    super();
    this.modificarNome = this.modificarNome.bind(this);
  }
  */


  modificarNome = (event) =>{
    this.setState(
     {nome : event.target.value}
    );
  }

  criarComboBox = () => {
    const opcoes = ["Fulano", "Ciclano"];
    const comboBoxOpcoes = opcoes.map(opcoes => <option>{opcoes}</option>);

    return(
       <select>
         {comboBoxOpcoes}
       </select>
    )
  }

  render(){
    const MeuComboBox = () => this.criarComboBox();
    return(
      <>
      <input type="text" value={this.state.nome} onChange={this.modificarNome}/>
      <h1>
      Hello {this.state.nome}
      </h1>
      <MeuComboBox/>
      </>
    )
  }
}

export default App;
