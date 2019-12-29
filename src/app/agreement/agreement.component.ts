import { Component, OnInit } from '@angular/core';
import { AgreementService } from "./../shared/service/agreement.service";
import { Agreement } from "./../shared/interface/agreement";

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  agreement:Agreement[];
  displayedColumns: string[] = ['vendorId', 'from', 'to', 'number'];
  dataSource: Agreement[] = [];
  constructor(private agreementService:AgreementService) { }

  ngOnInit() {
    this.getAgreement();
  }

  getAgreement()
  {
    this.agreementService.getAgreements().subscribe(data => {
      this.dataSource = this.agreement = data.agreement;
      console.log(data)
    })
  }

}
