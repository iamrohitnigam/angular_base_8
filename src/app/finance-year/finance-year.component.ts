import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-year',
  templateUrl: './finance-year.component.html',
  styleUrls: ['./finance-year.component.scss']
})
export class FinanceYearComponent implements OnInit {

  selectedFY:string = "2019-2020";
  constructor() { }

  ngOnInit() {
  }

}
