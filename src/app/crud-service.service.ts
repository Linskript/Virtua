import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private firestore: AngularFirestore) { }

  obterProdutos(): Observable<any[]> {
    return this.firestore.collection('produtos').snapshotChanges();
  }
 
  visualizarProduto(id: string): Observable<any> {
    return this.firestore.collection('produtos').doc(id).valueChanges();
  }
 
  cadastrarProduto(id: string, dados: any): Promise<void> {
    return this.firestore.collection('produtos').doc(id).set(dados);
  }
 
  excluirProduto(id: string): Promise<void> {
    return this.firestore.collection('produtos').doc(id).delete();
  }

  editarProduto(id: string, dados: any): Promise<void> {
    return this.firestore.collection('produtos').doc(id).update(dados);
  }
}

