import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../crud-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  produtos: any[] = [];

  constructor(private crudService: CrudServiceService, private router: Router) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.crudService.obterProdutos().subscribe(produtos => {
      this.produtos = produtos.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
    });
  }

  editarProduto(id: string, nome: string) {
    const novoNome = prompt('Digite o novo nome do produto:', nome);
    
    if (novoNome !== null) {
      this.crudService.editarProduto(id, { nome: novoNome })
        .then(() => {
          console.log('Produto editado com sucesso!');
          this.carregarProdutos();
        })
        .catch(error => {
          console.error('Erro ao editar o produto:', error);
        });
    }
  }

  excluirProduto(id: string) {
    this.crudService.excluirProduto(id).then(res => {
      this.carregarProdutos();
    });
  }
}