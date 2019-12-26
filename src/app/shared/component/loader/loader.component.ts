import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from '../../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show: Boolean = false;

  private loaderSubscription: Subscription;

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
  }

}
