import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalculadoraComponent} from "./calculadora.component";
import {CalculadoraService} from "./calculadora.service";
import {MatButtonModule} from "@angular/material/button";
import { HistoricoComponent } from './historico/historico.component';
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatBottomSheetModule,
    MatIconModule
  ],
  declarations: [
    CalculadoraComponent,
    HistoricoComponent
  ],
  exports: [
  	CalculadoraComponent,
    HistoricoComponent
  ],
  providers: [
  	CalculadoraService,
    HistoricoComponent
  ]
})
export class CalculadoraModule { }
