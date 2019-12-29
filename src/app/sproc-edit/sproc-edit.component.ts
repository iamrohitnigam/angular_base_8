import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sproc-edit',
  templateUrl: './sproc-edit.component.html',
  styleUrls: ['./sproc-edit.component.scss']
})
export class SprocEditComponent implements OnInit {

  constructor() { }

  
  options = ["one", "two"]
  loc = ["onsite", "offshore"]
  prog = ["CC", "BB", "AR", "CLD"]
  ass = ["Assignment1", "Assingment2", "Assgn3"]
  stat=["active", "inactive"]
  ngOnInit() {
  }

}
