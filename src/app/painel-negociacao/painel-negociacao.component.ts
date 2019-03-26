import { Component, OnInit, enableProdMode } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';
import { MessageService } from 'primeng/api';
enableProdMode()
@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {
 
  oportunidade = {}
  oportunidades = []
  oportunidadeUpdt = {}
  
  constructor(private oportunidadeService: OportunidadeService,
              private messageService: MessageService
  ) { 
    
  }

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.oportunidadeService.listar()
      .subscribe(resposta=>{
        this.oportunidades = <any> resposta;
        this.oportunidadeUpdt = {};
      });
  }

  adicionar() {
    this.oportunidadeService.adicionar(this.oportunidade)
      .subscribe(()=>{
        this.oportunidade = {};
        this.consultar();
        this.messageService.add({
          severity: 'success',
          summary: 'Oportunidade adicionada com sucesso'
        });
      })
  }

  deletar(oportunidade) {
    this.oportunidadeService.deletar(oportunidade).subscribe(()=>{
      this.consultar();
    })
  }

  atualizar(oportunidade) {
    if(oportunidade.id){
      this.oportunidadeService.atualizar(oportunidade).subscribe(()=>{
        this.consultar();
      })
    }
  }

  preparar(oportunidade) {
    this.oportunidadeUpdt = oportunidade; 
  }
}
