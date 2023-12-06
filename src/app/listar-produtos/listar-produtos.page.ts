import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../crud-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.page.html',
  styleUrls: ['./listar-produtos.page.scss'],
})

export class ListarProdutosPage implements OnInit {
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
 
  visualizarProduto(id: string) {
      this.router.navigate(['/produtos/editar', this.produtos]);
    
  }
 
  excluirProduto(id: string) {
    this.crudService.excluirProduto(id).then(res => {
      this.carregarProdutos();
    });
  }
 }