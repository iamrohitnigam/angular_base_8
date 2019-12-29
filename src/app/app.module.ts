import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'angular-highcharts';

import {
  MatSelectModule,
  MatDividerModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatButtonModule,
  MatMenuModule,
  MatBadgeModule,
  MatTooltipModule,
  MatDialogModule,
  MatExpansionModule,
  MatTableModule,
  MatTabsModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatSlideToggleModule
} from '@angular/material';
import { FinanceYearComponent } from './finance-year/finance-year.component';
import { SprocComponent } from './sproc/sproc.component';
import { SprocEditComponent } from './sproc-edit/sproc-edit.component';
import { AgreementComponent } from './agreement/agreement.component';
import { AgreementEditComponent } from './agreement-edit/agreement-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    HomeComponent,
    FinanceYearComponent,
    SprocComponent,
    SprocEditComponent,
    AgreementComponent,
    AgreementEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    //mat mods

    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    //mat mods
    FormsModule, 
    ReactiveFormsModule ,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
