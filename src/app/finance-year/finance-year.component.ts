import { Component, OnInit } from '@angular/core';
import { RevenueService } from "./../shared/service/revenue.service";
import { Chart, inArray } from 'highcharts';
import { Program, ActivityDesc, FundingStatus, CoreMS } from "./../shared/interface/finance-data";
import { OperationalConstant } from "./../shared/constant/operational-constant";
import { MatSlideToggleChange, MatSelectChange, MatCheckboxChange, getMatTooltipInvalidPositionError } from '@angular/material';
import 'chartjs-plugin-labels';

import * as Highcharts from 'highcharts';


import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


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

  coreOn: boolean = true;
  managedOn: boolean = true;

  p3On: boolean = true;
  p45On: boolean = true;
  p5On: boolean = true;

  p5: string;
  p4: string;
  p3: string;

  public doughnutChartLabels: Label[] = ['FSE', 'MOD', 'PM', 'SEC'];
  public barChartLabels: Label[] = ['P3', 'P4.5', 'P5'];
  public doughnutChartType: ChartType = 'doughnut';
  public barChartType: ChartType = 'bar';


  public doughnutChartQ1Data: MultiDataSet = [[0, 0, 0, 0]];
  public barChartQ1Data: MultiDataSet = [[0, 0, 0, 0]];

  public doughnutChartQ2Data: MultiDataSet = [[0, 0, 0, 0]];
  public barChartQ2Data: MultiDataSet = [[0, 0, 0, 0]];

  public doughnutChartQ3Data: MultiDataSet = [[0, 0, 0, 0]];
  public barChartQ3Data: MultiDataSet = [[0, 0, 0, 0]];

  public doughnutChartQ4Data: MultiDataSet = [[0, 0, 0, 0]];
  public barChartQ4Data: MultiDataSet = [[0, 0, 0, 0]];

  public doughnutChartTData: MultiDataSet = [[0, 0, 0, 0]];
  public barChartTData: MultiDataSet = [[0, 0, 0, 0]];

  calYear: boolean = false;
  currYear: string = "2020";

  calYearDisp = [
    {
      "title": "2018", "value": "2018-2019"
    }, {
      "title": "2019", "value": "2019-2020"
    }, {
      "title": "2020", "value": "2020-2021"
    }
    , {
      "title": "2021", "value": "2021-2022"
    }
  ];
  calYearDispTit: string = "Financial Year";
  displayQ = {
    "Q1": {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0,
      "P3": 0,
      "P45": 0,
      "P5": 0

    },
    "Q2": {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0,
      "P3": 0,
      "P45": 0,
      "P5": 0

    },
    "Q3": {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0,
      "P3": 0,
      "P45": 0,
      "P5": 0

    },
    "Q4": {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0,
      "P3": 0,
      "P45": 0,
      "P5": 0

    },
  }

  constructor(private revService: RevenueService) { }
  changeOption(event: MatCheckboxChange) {
    switch (event.source.name) {
      case "p5":
        this.p5On = event.checked
        break;

      case "p45":
        this.p45On = event.checked
        break;

      case "p5":
        this.p5On = event.checked
        break;

      case "core":
        this.coreOn = event.checked
        break;

      case "managed":
        this.managedOn = event.checked
        break;

      default:
        break;
    }

    this.reEvaluate()

  }
  ngOnInit() {
    this.getRevenueData();
  }

  changeYearType(event: MatSlideToggleChange) {
    // console.log('toggle', event.checked);
    this.calYear = event.checked;
    this.calYearDispTit = (this.calYear === true) ? "Calendar Year" : "Financial Year"

    this.reEvaluate()
  }

  yearChanged(event: MatSelectChange) {
    this.currYear = event.value;
    // console.log(event.value)

    this.reEvaluate()
  }

  reEvaluate() {

    // let x:any  = JSON.parse(JSON.stringify(this.revenueMaster))

    // console.log(x)
    // console.log(this.revenueMaster)
    console.log(this.revenueMaster)

    for (let key in this.revenueMaster) {
      let ibuArr = this.revenueMaster[key];
      // console.log(ibuArr)
      for (let keyIbu in ibuArr) {
        let dMArr = ibuArr[keyIbu];
        // console.log(dMArr)
        for (let keyP in dMArr) {
          let projA = dMArr[keyP];
          // console.log(projA)
          for (let keyPname in projA) {
            let partProj = projA[keyPname];
            if (partProj[this.currYear] !== undefined) {
              console.log((partProj))
              let mdet = this.calculateProjectSum(partProj);
              partProj[this.currYear]["Q"] = mdet
            }
          }
        }
      }
    }
    console.log(this.revenueMaster)

    let t = this.calculateQuaterRevenue("q1");
    this.doughnutChartQ1Data = [[t.MOD, t.PMGT, t.FS, t.SEC]];
    this.barChartQ1Data = [[t.p3, t.p45, t.p5]];

    let t1 = this.calculateQuaterRevenue("q2");
    this.doughnutChartQ2Data = [[t1.MOD, t1.PMGT, t1.FS, t1.SEC]];
    this.barChartQ2Data = [[t1.p3, t1.p45, t1.p5]];

    let t2 = this.calculateQuaterRevenue("q3");
    this.doughnutChartQ3Data = [[t2.MOD, t2.PMGT, t2.FS, t2.SEC]];
    this.barChartQ3Data = [[t2.p3, t2.p45, t2.p5]];

    let t3 = this.calculateQuaterRevenue("q4");
    this.doughnutChartQ4Data = [[t3.MOD, t3.PMGT, t3.FS, t3.SEC]];
    this.barChartQ4Data = [[t3.p3, t3.p45, t3.p5]];

    this.getTotal(t, t1, t2, t3);

  }
  getTotal(t, t1, t2, t3) {
    this.doughnutChartTData = [
      [t3.MOD + t1.MOD + t2.MOD + t.MOD,
      t3.PMGT + t1.PMGT + t2.PMGT + t.PMGT,
      t3.FS + t1.FS + t2.FS + t.FS,
      t3.SEC + t1.SEC + t2.SEC + t.SEC]
    ];
    this.barChartTData = [
      [t3.p3 + t1.p3 + t2.p3 + t.p3,
      t3.p45 + t1.p45 + t2.p45 + t.p45,
      t3.p5 + t1.p5 + t2.p5 + t.p5]
    ];

  }
  calculateQuaterRevenue(quater) {
    let total = {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0,
      "p3": 0,
      "p45": 0,
      "p5": 0,
    }

    for (let key in this.revenueMaster) {
      let ibuArr = this.revenueMaster[key];
      // console.log(ibuArr)
      for (let keyIbu in ibuArr) {
        let dMArr = ibuArr[keyIbu];
        // console.log(dMArr)
        for (let keyP in dMArr) {
          let projA = dMArr[keyP];
          // console.log(projA)
          for (let keyPname in projA) {
            let partProj = projA[keyPname];
            // let mdet = this.calculateProjectSum(partProj);
            if (partProj[this.currYear] !== undefined) {
              total.MOD += partProj[this.currYear]["Q"][quater].total.MOD;
              total.PMGT += partProj[this.currYear]["Q"][quater].total.PMGT;
              total.FS += partProj[this.currYear]["Q"][quater].total.FS;
              total.SEC += partProj[this.currYear]["Q"][quater].total.SEC;
              total.p3 += partProj[this.currYear]["Q"][quater].total.p3;
              total.p45 += partProj[this.currYear]["Q"][quater].total.p45;
              total.p5 += partProj[this.currYear]["Q"][quater].total.p5;
              // console.log((partProj[this.currYear]["Q"]))
            }
          }
        }
      }
    }

    return total
  }

  calculateProjectSum(project) {
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let quaters = {
      q1: {},
      q2: {},
      q3: {},
      q4: {}
    }

    let monthDoc = {
      'Jan': {}, 'Feb': {}, 'Mar': {}, 'Apr': {}, 'May': {}, 'Jun': {}, 'Jul': {}, 'Aug': {}, 'Sep': {}, 'Oct': {}, 'Nov': {}, 'Dec': {}
    }
    // console.log(project)
    // console.log(project)
    let months = project[this.currYear];
    // console.log(months)

    if (months !== undefined) {
      mS.forEach(mt => {
        if (months[mt] !== undefined) {
          monthDoc[mt] = this.calculateMonthlyHeads(months[mt]);

        }
      })
    }

    // console.log(monthDoc)
    // if (this.calYear === true) {
    quaters.q1 = {
      "Jan": monthDoc["Jan"],
      "Feb": monthDoc["Feb"],
      "Mar": monthDoc["Mar"],
      "total": this.getMonthTot(monthDoc, ['Jan', 'Feb', 'Mar'])

    }

    quaters.q2 = {
      "Apr": monthDoc["Apr"],
      "May": monthDoc["May"],
      "Jun": monthDoc["Jun"],
      "total": this.getMonthTot(monthDoc, ['Apr', 'May', 'Jun'])
    }

    quaters.q3 = {
      "Jul": monthDoc["Jul"],
      "Aug": monthDoc["Aug"],
      "Sep": monthDoc["Sep"],
      "total": this.getMonthTot(monthDoc, ['Jul', 'Aug', 'Sep'])
    }

    quaters.q4 = {
      "Oct": monthDoc["Oct"],
      "Nov": monthDoc["Nov"],
      "Dec": monthDoc["Dec"],
      "total": this.getMonthTot(monthDoc, ['Oct', 'Nov', 'Dec'])
    }
    // }
    // else {
    //   quaters.q4 = {
    //     "Jan": monthDoc["Jan"],
    //     "Feb": monthDoc["Feb"],
    //     "Mar": monthDoc["Mar"],
    //     "total": this.getMonthTot(monthDoc, ['Jan', 'Feb', 'Mar'])
    //   }

    //   quaters.q1 = {
    //     "Apr": monthDoc["Apr"],
    //     "May": monthDoc["May"],
    //     "Jun": monthDoc["Jun"],
    //     "total": this.getMonthTot(monthDoc, ['Apr', 'May', 'Jun'])
    //   }

    //   quaters.q2 = {
    //     "Jul": monthDoc["Jul"],
    //     "Aug": monthDoc["Aug"],
    //     "Sep": monthDoc["Sep"],
    //     "total": this.getMonthTot(monthDoc, ['Jul', 'Aug', 'Sep'])
    //   }

    //   quaters.q3 = {
    //     "Oct": monthDoc["Oct"],
    //     "Nov": monthDoc["Nov"],
    //     "Dec": monthDoc["Dec"],
    //     "total": this.getMonthTot(monthDoc, ['Oct', 'Nov', 'Dec'])
    //   }
    // }
    return quaters
  }
  getMonthTot(monthDoc, monthsArr) {

    let ret = {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0,
      "p3": 0,
      "p45": 0,
      "p5": 0,
    }
    monthsArr.forEach(mt => {

      if (Object.keys(monthDoc[mt]).length > 0) {
        ret.MOD += monthDoc[mt]["core"]["tot"]["MOD"] + monthDoc[mt]["ms"]["tot"]["MOD"];
        ret.PMGT += monthDoc[mt]["core"]["tot"]["PMGT"] + monthDoc[mt]["ms"]["tot"]["PMGT"];
        ret.FS += monthDoc[mt]["core"]["tot"]["FS"] + monthDoc[mt]["ms"]["tot"]["FS"];
        ret.SEC += monthDoc[mt]["core"]["tot"]["SEC"] + monthDoc[mt]["ms"]["tot"]["SEC"];
        ret.p3 += monthDoc[mt]["core"]["tot"]["p3"] + monthDoc[mt]["ms"]["tot"]["p3"];
        ret.p45 += monthDoc[mt]["core"]["tot"]["p45"] + monthDoc[mt]["ms"]["tot"]["p45"];
        ret.p5 += monthDoc[mt]["core"]["tot"]["p5"] + monthDoc[mt]["ms"]["tot"]["p5"];
      }
    });

    return ret;

  }
  calculateMonthlyHeads(month) {

    // console.log(month);

    let core = month["Core"];
    let mS = month["MS"];

    // this.calculatePProfile(core);
    // this.calculatePProfile(mS);
    return { "core": (this.coreOn === true) ? this.calculatePProfile(core) : {}, "ms": (this.managedOn === true) ? this.calculatePProfile(mS) : {} }

  }

  calculatePProfile(dt) {
    let p3 = {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0
    };

    if (this.p3On === true) {
      p3 = {
        MOD: (dt["P3"]["MOD"]["BETEBSProjHours"] * dt["P3"]["MOD"]["BETEBSProjAmount"]) + (dt["P3"]["MOD"]["AEOPEBSProjHours"] * dt["P3"]["MOD"]["AEOPEBSProjAmount"]),
        PMGT: (dt["P3"]["PMGT"]["BETEBSProjHours"] * dt["P3"]["PMGT"]["BETEBSProjAmount"]) + (dt["P3"]["PMGT"]["AEOPEBSProjHours"] * dt["P3"]["PMGT"]["AEOPEBSProjAmount"]),
        FS: (dt["P3"]["FS"]["BETEBSProjHours"] * dt["P3"]["FS"]["BETEBSProjAmount"]) + (dt["P3"]["FS"]["AEOPEBSProjHours"] * dt["P3"]["FS"]["AEOPEBSProjAmount"]),
        SEC: (dt["P3"]["SEC"]["BETEBSProjHours"] * dt["P3"]["SEC"]["BETEBSProjAmount"]) + (dt["P3"]["SEC"]["AEOPEBSProjHours"] * dt["P3"]["SEC"]["AEOPEBSProjAmount"])
      }
    }
    let p45 = {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0
    };
    if (this.p3On === true) {
      p45 = {
        MOD: (dt["P45"]["MOD"]["BETEBSProjHours"] * dt["P45"]["MOD"]["BETEBSProjAmount"]) + (dt["P45"]["MOD"]["AEOPEBSProjHours"] * dt["P45"]["MOD"]["AEOPEBSProjAmount"]),
        PMGT: (dt["P45"]["PMGT"]["BETEBSProjHours"] * dt["P45"]["PMGT"]["BETEBSProjAmount"]) + (dt["P45"]["PMGT"]["AEOPEBSProjHours"] * dt["P45"]["PMGT"]["AEOPEBSProjAmount"]),
        FS: (dt["P45"]["FS"]["BETEBSProjHours"] * dt["P45"]["FS"]["BETEBSProjAmount"]) + (dt["P45"]["FS"]["AEOPEBSProjHours"] * dt["P45"]["FS"]["AEOPEBSProjAmount"]),
        SEC: (dt["P45"]["SEC"]["BETEBSProjHours"] * dt["P45"]["SEC"]["BETEBSProjAmount"]) + (dt["P45"]["SEC"]["AEOPEBSProjHours"] * dt["P45"]["SEC"]["AEOPEBSProjAmount"])
      }
    }
    let p5 = {
      "MOD": 0,
      "PMGT": 0,
      "FS": 0,
      "SEC": 0
    };
    if (this.p3On === true) {
      p5 = {
        MOD: (dt["P5"]["MOD"]["BETEBSProjHours"] * dt["P5"]["MOD"]["BETEBSProjAmount"]) + (dt["P5"]["MOD"]["AEOPEBSProjHours"] * dt["P5"]["MOD"]["AEOPEBSProjAmount"]),
        PMGT: (dt["P5"]["PMGT"]["BETEBSProjHours"] * dt["P5"]["PMGT"]["BETEBSProjAmount"]) + (dt["P5"]["PMGT"]["AEOPEBSProjHours"] * dt["P5"]["PMGT"]["AEOPEBSProjAmount"]),
        FS: (dt["P5"]["FS"]["BETEBSProjHours"] * dt["P5"]["FS"]["BETEBSProjAmount"]) + (dt["P5"]["FS"]["AEOPEBSProjHours"] * dt["P5"]["FS"]["AEOPEBSProjAmount"]),
        SEC: (dt["P5"]["SEC"]["BETEBSProjHours"] * dt["P5"]["SEC"]["BETEBSProjAmount"]) + (dt["P5"]["SEC"]["AEOPEBSProjHours"] * dt["P5"]["SEC"]["AEOPEBSProjAmount"])
      }
    }


    // let p3Tot = {
    //   "total": p3.MOD + p3.FS + p3.PMGT + p3.SEC
    // }
    // let p45Tot = {
    //   "total": p45.MOD + p45.FS + p45.PMGT + p45.SEC
    // }
    // let p5Tot = {
    //   "total": p5.MOD + p5.FS + p5.PMGT + p5.SEC
    // }

    // let masterTotal = {
    //   "mTot": (p3Tot.total + p45Tot.total + p5Tot.total)
    // }
    // let actTotal = {
    //   "MOD": p3.MOD + p45.MOD + p5.MOD,
    //   "PMGT": p3.PMGT + p45.PMGT + p5.PMGT,
    //   "FS": p3.FS + p45.FS + p5.FS,
    //   "SEC": p3.SEC + p45.SEC + p5.SEC
    // }
    return {
      "p3": p3, "p45": p45, "p5": p5, "tot": {
        "MOD": p3.MOD + p45.MOD + p5.MOD,
        "PMGT": p3.PMGT + p45.PMGT + p5.PMGT,
        "FS": p3.FS + p45.FS + p5.FS,
        "SEC": p3.SEC + p45.SEC + p5.SEC,
        "p3": p3.MOD + p3.FS + p3.PMGT + p3.SEC,
        "p45": p45.MOD + p45.FS + p45.PMGT + p45.SEC,
        "p5": p5.MOD + p5.FS + p5.PMGT + p5.SEC,
      }
    };
  }

  getRevenueData() {
    this.revService.getRevenue()
      .subscribe(data => {
        // console.log(data);
        this.revenue = data;
        // console.log(this.revenue)
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



              // let month = {
              //   "Jan": cms,
              //   "Feb": cms,
              //   "Mar": cms,
              //   "Apr": cms,
              //   "May": cms,
              //   "Jun": cms,
              //   "Jul": cms,
              //   "Aug": cms,
              //   "Sep": cms,
              //   "Oct": cms,
              //   "Nov": cms,
              //   "Dec": cms,
              // };

              // this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2019"] = JSON.parse(JSON.stringify(month));
              // this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2020"] = JSON.parse(JSON.stringify(month));
              // this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID]["2021"] = JSON.parse(JSON.stringify(month));
            }

            if (this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY] === undefined) {
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY] = [];
              // console.log(this.revenueMaster)
            }

            // console.log(this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID])
            if (this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName] === undefined) {
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
          
              let fs = {
                P3: ad,
                P45: ad,
                P5: ad
              };
          
              let cms = {
                Core: fs,
                MS: fs
              };

              // let mth = {[proj.MonthName] : cms}
              // debugger
              // console.log(this.revenueMaster)
              this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName] = JSON.parse(JSON.stringify(cms));
              // this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName] = JSON.parse(JSON.stringify(cms));
              // console.log(this.revenueMaster)
            }


            // console.log(proj)
            // console.log(this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName])


            // let currCore = this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName].Core.P45["FS"];
            // console.log(currCore)

            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["BETEBSProjHours"] += proj.BETEBSProjHours;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["BETEBSProjAmount"] += proj.BETEBSProjAmount;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["AEOPEBSProjHours"] += proj.AEOPEBSProjHours;
            this.revenueMaster[ibg.IBG][ibu.IBU][dm.DeliveryManager][proj.ProjectID][proj.CY][proj.MonthName][proj.CoreMS][proj.FundingStatus][proj.ActivityDesc]["AEOPEBSProjAmount"] += proj.AEOPEBSProjAmount;
          });
        });
      });
    });

    this.reEvaluate();
    // console.log(this.revenueMaster)
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

  getMonths(q) {
    let ret = ""
    switch (q) {
      case "Q1":
        ret = (this.calYear === true) ? "Jan-Feb-Mar" : "Apr-May-Jun"
        break;

      case "Q2":
        ret = (this.calYear === true) ? "Apr-May-Jun" : "Jul-Aug-Sep"
        break;

      case "Q3":
        ret = (this.calYear === true) ? "Jul-Aug-Sep" : "Oct-Nov-Dec"
        break;

      case "Q4":
        ret = (this.calYear === true) ? "Oct-Nov-Dec" : "Jan-Feb-Mar"
        break;
      default:
        break;
    }
    return ret.toUpperCase();

  }

}
