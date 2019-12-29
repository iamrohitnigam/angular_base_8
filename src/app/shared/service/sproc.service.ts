import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sproc,Sprocs } from '../interface/sproc';

const localUrl = 'assets/data/sproc.json';

@Injectable({
  providedIn: 'root'
})
export class SprocService {
  constructor(private http: HttpClient) { }

  getSprocs(): Observable <Sprocs> {
    return this.http.get<Sprocs>(localUrl);
  }


  getSproc(id): Observable <Sprocs> {
    return this.http.get<Sprocs>(localUrl);
  }
  
}
