import {Component, HostListener, OnInit} from '@angular/core';
import {CalculadoraService} from "./calculadora.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {HistoricoComponent} from "./historico/historico.component";
import {Calculo} from "./models/calculo";


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string = '';
  private numero2: string = '';
  private resultado: number = 0;
  private operacao: string = '';
  hist: any[] = [];

  constructor(private calculadoraService: CalculadoraService, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  	this.limpar();
  }

  @HostListener('document:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {

    const validkeysNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    const validOper = ['=','+','-','*','/']

    if (validkeysNum.includes(event.key)){
      this.adicionarNumero(event.key);
    }else if(validOper.includes(event.key)){
      this.definirOperacao(event.key);
    }else if(event.key.includes("Enter")){
      this.calcular();
    }else if(event.key.includes("Delete")){
      this.limpar();
    }else if(event.key.includes(",")){
      this.adicionarNumero(".");
    }
  }

  limpar(): void {
  	this.numero1 = '0';
    this.numero2 = '';
    this.resultado = 0;
    this.operacao = '';
  }

  adicionarNumero(numero: string): void {
  	if (this.operacao === '') {
  	  this.numero1 = this.concatenarNumero(this.numero1, numero);
  	} else {
  	  this.numero2 = this.concatenarNumero(this.numero2, numero);
  	}
  }


  concatenarNumero(numAtual: string, numConcat: string): string {
    if (numAtual === '0' || numAtual === '') {
  	  numAtual = '';
  	}

  	if (numConcat === '.' && numAtual === '') {
  	  return '0.';
  	}

  	if (numConcat === '.' && numAtual.indexOf('.') > -1) {
  	  return numAtual;
  	}
  	return numAtual + numConcat;
  }

  definirOperacao(operacao: string): void {
    const opeOld = this.operacao;
    this.operacao = operacao;


  	if (opeOld && opeOld !== operacao) {
  		this.calcular(opeOld);
  	}
  }

  calcular(operacao?: string): void {
  	if (this.numero2 === '') {
  		return;
  	}

    const calculo = new Calculo();
    calculo.numero1 = this.numero1;
    calculo.numero2 = this.numero2;

    if (operacao){
      this.resultado = this.calculadoraService.calcular(parseFloat(this.numero1),	parseFloat(this.numero2),	operacao);
      calculo.operacao = operacao;
    }else {
      this.resultado = this.calculadoraService.calcular(parseFloat(this.numero1),	parseFloat(this.numero2),	this.operacao);
      calculo.operacao = this.operacao;
    }

    calculo.resultado = this.resultado;

    this.numero2 = '';
    this.hist.push(calculo);
  }


  get display(): string {
  	if (this.resultado !== 0) {
      this.numero1 = this.resultado.toString();
      this.resultado = 0;
      return this.numero1;
  	}
  	if (this.numero2 !== '') {
  		return this.numero2;
  	}
  	return this.numero1;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(HistoricoComponent, {
      data: { hist: this.hist },
    });
  }

  backspace(){
    this.numero1 = this.numero1.slice(0, -1)
  }

}
