import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FinanceYearComponent } from './finance-year/finance-year.component';
import { SprocComponent } from './sproc/sproc.component';
import { AgreementComponent } from './agreement/agreement.component';
import { AgreementEditComponent } from './agreement-edit/agreement-edit.component';
import { SprocEditComponent } from './sproc-edit/sproc-edit.component';


const routes: Routes = [
  {path: "",  component: HomeComponent},
  {path: "finance",  component: FinanceYearComponent},
  // {path: "form",  component: SprocComponent},
  {path: "form",  component: SprocEditComponent},
  {path: "agreement",  component: AgreementComponent},
  {path: "agreementedit/:id",  component: AgreementEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
