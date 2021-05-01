
import React from "react";

import ProdutoService from "../../service/produtoService";

import {withRouter} from "react-router-dom";

import Card from "../../componentes/card"

import ProdutosTable from  "./produtosTable"

class ConsultaProdutos extends React.Component{

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    state = {
        produtos : []
    }

    componentDidMount(){
        const produtos = this.service.obterProdutos();
        this.setState({produtos});        
    }

    prepararEditar = (sku) => {
        console.log(sku);
        this.props.history.push(`cadastro-produtos/${sku}`);
    } 

    deletar = (sku) =>{
       const produtos = this.service.deletar(sku);
       this.setState({produtos});
    }

    render(){
        return(
            <Card header="Consulta De Produtos">
            <ProdutosTable produtos={this.state.produtos} 
             editarAction={this.prepararEditar}
             deletarAction={this.deletar}/>
          </Card>
        );
    }
}

export default withRouter(ConsultaProdutos);