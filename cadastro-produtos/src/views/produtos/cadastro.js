import React from "react";
import ProdutoService from "../../service/produtoService";
import Card from "../../componentes/card"

import {withRouter} from "react-router-dom";

const estadoInicial =  
        {
        nome : '',
        sku : '',
        descricao : '',
        preco : 0,
        fornecedor : '',
        sucesso: false,
        erros: [],
        atualizando: false
        }

class cadastroProduto extends React.Component {

    state = estadoInicial

    constructor(){
        super();
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value;
        const nomeCampo = event.target.name;
        this.setState({[nomeCampo]: valor});
    }

    onSubmit = (event) => {
       event.preventDefault();

      const produto = {
        nome : this.state.nome,
        sku : this.state.sku,
        descricao : this.state.descricao,
        preco : this.state.preco,
        fornecedor : this.state.fornecedor
        }
        
        try{
            this.service.salvar(produto);

            this.limparCampos();
            this.setState({sucesso: true});
        }catch(Erro){
            const erros = Erro.erros;
            this.setState({erros: erros})
        }
    }

    limparCampos = () => {
        this.setState(estadoInicial);
    }

    componentDidMount(){
        const sku = this.props.match.params.sku;
        if(sku){
            const resultado = this.service.obterProdutos().filter(produto => produto.sku === sku);
            if(resultado.length === 1){
                 const produtoEncontado = resultado[0];
                 this.setState({...produtoEncontado, atualizando : true});
            }
        }
    }

    render() {
        return (
         <Card header={this.state.atualizando ? 'Atualização de Produtos' : 'Cadastro de Produtos'}>

              <form onSubmit={this.onSubmit}>

              { this.state.sucesso &&
               <div className="alert alert-dismissible alert-success">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Bem feito!</strong>Cadastro Realizado com Sucesso.
                </div>
               }

            { this.state.erros.length > 0 &&

               this.state.erros.map( msg => {
                return (
               <div className="alert alert-dismissible alert-danger">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Erro!</strong> {msg}
                </div>
               )})
            }

                  <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text" 
                                       name="nome"
                                       value={this.state.nome} 
                                       onChange={this.onChange}
                                       className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text" disabled={this.state.atualizando} name="sku" value={this.state.sku} onChange={this.onChange} className="form-control"/>
                            </div>
                        </div>
                   </div>
                   <div className="row">
                   <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição: </label>
                                <textarea value={this.state.descricao} name="descricao" onChange={this.onChange} className="form-control"/>
                            </div>
                        </div>
                   </div>
                   <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input type="text" value={this.state.preco} name="preco" onChange={this.onChange} className="form-control"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input type="text" value={this.state.fornecedor} name="fornecedor" onChange={this.onChange} className="form-control"/>
                            </div>
                        </div>
                   </div>
                   <div className="row">
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success">
                            {this.state.atualizando ? 'Editar' : 'Salvar'}
                            </button>
                        </div>
                        <div className="col-md-1">
                             <button onClick={this.limparCampos} className="btn btn-primary">Limpar</button>
                        </div>
                   </div>
                   </form>
        </Card>
     )
    }

}

export default withRouter(cadastroProduto);