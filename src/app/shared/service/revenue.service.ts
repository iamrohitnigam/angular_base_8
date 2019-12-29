import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from "./../../shared/interface/finance-data";

const localUrl = 'assets/data/data.json';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  
  constructor(private http: HttpClient) { }

  getRevenue(): Observable <Program> {
    return this.http.get<Program>(localUrl);
  }
}
