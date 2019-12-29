import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Sproc } from '../shared/interface/sproc';
import { SprocService } from '../shared/service/sproc.service';


@Component({
  selector: 'app-sproc',
  templateUrl: './sproc.component.html',
  styleUrls: ['./sproc.component.scss']
})
export class SprocComponent implements OnInit {


  sproc:Sproc[];
  displayedColumns: string[] = ['attuid', 'name', 'application', 'startDate'];
  dataSource: Sproc[] = [];
  
  constructor(private service:SprocService) { }

  ngOnInit() {
    this.getSproc();
  }

  getSproc()
  {
    this.service.getSprocs().subscribe(data => {
      this.dataSource = this.sproc = data.sproc;
      console.log(data)
    })
  }

}