import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private readonly loaderSubject: BehaviorSubject<LoaderState> = new BehaviorSubject<LoaderState>(<LoaderState>{ show: false });
  loaderState: Observable<LoaderState> = this.loaderSubject.asObservable();

  constructor() { }

  show(): void {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  hide(): void {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}


export interface LoaderState {
  show: boolean;
}

