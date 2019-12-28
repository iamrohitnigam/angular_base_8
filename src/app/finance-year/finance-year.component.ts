import { Component, OnInit } from '@angular/core';
import { RevenueService } from "./../shared/service/revenue.service";
import { Chart } from 'highcharts';
import { Program, ActivityDesc, FundingStatus, CoreMS } from "./../shared/interface/finance-data";
import { OperationalConstant } from "./../shared/constant/operational-constant";


@Component({
  selector: 'app-finance-year',
  templateUrl: './finance-year.component.html',
  styleUrls: ['./finance-year.component.scss']
})
export class FinanceYearComponent implements OnInit {

  selectedFY: string = "2019-2020";
  revenue: Program;

  revenueMaster: any[] = [];
  revenueMasterDoc: any = {};

  constructor(private revService: RevenueService) { }

  ngOnInit() {
    this.getRevenueData();
  }

  getRevenueData() {
    this.revService.getRevenue()
      .subscribe(data => {
        console.log(data);
        this.revenue = data;
        console.log(this.revenue)
        this.createRevenueMaster()
      });
  }

  createRevenueMaster() {

    this.revenue.ibgrevenueInfo.forEach(ibg => {
      if (this.revenueMaster[ibg.IBG] === undefined) {
        this.revenueMaster[ibg.IBG] = [];
      }
      ibg.iburevenueInfo.forEach(ibu => {
        if (this.revenueMaster[ibg.IBG][ibu.IBU] === undefined) {
          this.revenueMaster[ibg.IBG][ibu.IBU] = [];
        }
        ibu.DeliveryManager.forEach(dm => {
          if (this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager] === undefined) {
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager] = [];
          }
          dm.Projects.forEach(proj => {
            if (this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID] === undefined) {
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID] = [];

              let arr2 = {
                BETEBSProjHours: 0,
                BETEBSProjAmount: 0,
                AEOPEBSProjHours: 0,
                AEOPEBSProjAmount: 0,
              };

              let ad = {
                MOD: arr2,
                PMGT: arr2,
                FS: arr2,
                SEC: arr2,
              }
              // ad[ActivityDesc.MOD] = arr2;
              // ad[ActivityDesc.PMGT] = arr2;
              // ad[ActivityDesc.fullStack] = arr2;
              // ad[ActivityDesc.security] = arr2;

              let fs = {
                P3: ad,
                P45: ad,
                P5: ad
              };
              

              let cms = {
                Core: fs,
                MS: fs
              };

              let month = {
                "Jan": cms,
                "Feb": cms,
                "Mar": cms,
                "Apr": cms,
                "May": cms,
                "Jun": cms,
                "Jul": cms,
                "Aug": cms,
                "Sep": cms,
                "Oct": cms,
                "Nov": cms,
                "Dec": cms,
              };

              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2019"] = JSON.parse(JSON.stringify(month));
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2020"] = JSON.parse(JSON.stringify(month));
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2021"] = JSON.parse(JSON.stringify(month));

            }
            // console.log(proj)
            // console.log(this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName])
       

            // let currCore = this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName].Core.P45["FS"];
            // console.log( currCore)

            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["BETEBSProjHours"] += proj.BETEBSProjHours;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["BETEBSProjAmount"] += proj.BETEBSProjAmount;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["AEOPEBSProjHours"] += proj.AEOPEBSProjHours;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["AEOPEBSProjAmount"] += proj.AEOPEBSProjAmount;
          });
        });
      });
    });
    console.log(this.revenueMaster)
  }



  // createRevenueMaster2() {

  //   let ibgList = [];
  //   this.revenue.ibgrevenueInfo.forEach(ibg => {

  //     ibgList[ibg.IBG] = []

  //     ibg.iburevenueInfo.forEach(ibu => {

  //       ibgList[ibg.IBG][ibu.IBU]["amt"] += ibu.amt;
  //     });
  //   });
  // }

}
