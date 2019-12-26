import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FinanceYearComponent } from './finance-year/finance-year.component';


const routes: Routes = [
  {path: "",  component: HomeComponent},
  {path: "finance",  component: FinanceYearComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
