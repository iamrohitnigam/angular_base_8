import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AgreementService } from '../shared/service/agreement.service';
import { Agreement } from '../shared/interface/agreement';

@Component({
  selector: 'app-agreement-edit',
  templateUrl: './agreement-edit.component.html',
  styleUrls: ['./agreement-edit.component.scss']
})
export class AgreementEditComponent implements OnInit {

  currId: string;
  currAgreement: Agreement = {
    vendorId: 222,
    from: "2019-10-11",
    to: "2019-11-11",
    number: "123"
  };
  constructor(private route: ActivatedRoute,
    private service: AgreementService) { }

  ngOnInit() {
    this.currId = this.route.snapshot.paramMap.get('id');
    console.log(this.currId)
    this.service.getAgreement
  }

}
