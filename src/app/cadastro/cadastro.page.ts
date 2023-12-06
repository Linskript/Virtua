import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../crud-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(private crud : CrudServiceService, private firestore : AngularFirestore) { }

  ngOnInit() {
  }

  nomeProduto: any;
  precoProduto: any;
  descricaoProduto: any;
  novoProduto: any = {};
  produtos: any[] = [];

  carregarProdutos() {
    this.crud.obterProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  cadastrarNovoProduto() {
    if (this.novoProduto.nome) {
      this.crud.cadastrarProduto(this.novoProduto.produtoId, this.novoProduto)
        .then(() => {
          console.log('Produto cadastrado com sucesso!');
          this.carregarProdutos(); 
        })
        .catch(error => {
          console.error('Erro ao cadastrar o produto:', error);
        });
      this.novoProduto = {};
    } else {
      console.warn('O nome do produto é obrigatório!');
    }
  }

}
