import React from 'react'


export default (props) => (
<table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">SKU</th>
                <th scope="col">Preço</th>
                <th scope="col">Fornecedor</th>
              </tr>
            </thead>
            <tbody>
              { props.produtos.map( (produto, index) => 
              <tr className="table-active" key={index}>
                <th scope="row">{produto.nome}</th>
                <th>{produto.sku}</th>
                <th>{produto.preco}</th>
                <th>{produto.fornecedor}</th>
                <th>
                  <button onClick={() => props.editarAction(produto.sku)} className="btn btn-primary">EDITAR</button>
                  <button onClick={()=> props.deletarAction(produto.sku)} className="btn btn-danger">DELETAR</button>
                </th>
              </tr>
              )
              }
            </tbody>
          </table>

)