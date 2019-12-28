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
              let arr2 = [];
              arr2["BETEBSProjHours"] = 0;
              arr2["BETEBSProjAmount"] = 0;
              arr2["AEOPEBSProjHours"] = 0;
              arr2["AEOPEBSProjAmount"] = 0;

              let ad = [];
              ad[ActivityDesc.MOD] = arr2;
              ad[ActivityDesc.PMGT] = arr2;
              ad[ActivityDesc.fullStack] = arr2;
              ad[ActivityDesc.security] = arr2;

              let fs = [];
              fs[FundingStatus.p3] = ad;
              fs[FundingStatus.p45] = ad;
              fs[FundingStatus.p5] = ad;

              let cms = [];
              cms[CoreMS.core] = fs;
              cms[CoreMS.managed] = fs;

              let month = [];
              OperationalConstant.months.forEach(mth => {
                month[mth.slug] = cms;
              })

              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2019"] = month;
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2020"] = month;
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2021"] = month;

            }
            console.log(proj)

            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["BETEBSProjHours"] += proj.BETEBSProjHours;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["BETEBSProjAmount"] += proj.BETEBSProjAmount;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["AEOPEBSProjHours"] += proj.AEOPEBSProjHours;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["AEOPEBSProjAmount"] += proj.AEOPEBSProjAmount;
          });
        });
      });
    });
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
