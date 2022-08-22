import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {Calculo} from "../models/calculo";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<HistoricoComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {hist: Calculo[]}) {}

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


}
