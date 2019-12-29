import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agreements, Agreement } from "./../../shared/interface/agreement";


const localUrl = 'assets/data/agreement.json';


@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  constructor(private http: HttpClient) { }

  getAgreements(): Observable <Agreements> {
    return this.http.get<Agreements>(localUrl);
  }


  getAgreement(id): Observable <Agreement> {
    return this.http.get<Agreement>(localUrl);
  }
}
