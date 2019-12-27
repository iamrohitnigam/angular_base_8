import { Component, OnInit } from '@angular/core';

import { Chart } from 'highcharts';

@Component({
  selector: 'app-finance-year',
  templateUrl: './finance-year.component.html',
  styleUrls: ['./finance-year.component.scss']
})
export class FinanceYearComponent implements OnInit {

  selectedFY:string = "2019-2020";

  // chart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Linechart'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series : [{
  //     type: 'pie',
  //     name: 'Browser share',
  //     data: [
  //        ['Firefox',   45.0],
  //        ['IE',       26.8],
  //        {
  //           name: 'Chrome',
  //           y: 12.8,
  //           sliced: true,
  //           selected: true
  //        },
  //        ['Safari',    8.5],
  //        ['Opera',     6.2],
  //        ['Others',      0.7]
  //     ]
  //  }]
  // });

  constructor() { }

  ngOnInit() {
  }

}
