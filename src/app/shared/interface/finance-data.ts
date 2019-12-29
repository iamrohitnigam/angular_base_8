export interface Program {
    ibgrevenueInfo: [IBG]
    program: string
}
export interface IBG {
    iburevenueInfo: [IBU];
    IBG: string;
}

export interface IBU {
    IBU: string;
    DeliveryManager: [DeliveryManager]
}
export interface DeliveryManager {
    DeliveryManager: string;
    Projects: [Projects];
}

export interface Projects {
    ProjectName: string;
    ProjectID: string;
    ProjectManager: string;
    MotsID: string;
    MotsAppName: string;
    FundingStatus: FundingStatus;
    CoreMS: CoreMS;
    EstimationID: string;
    MonthName: string;
    ActivityDesc: ActivityDesc;
    BETEBSProjHours: number;
    BETEBSProjAmount: number;
    AEOPEBSProjHours: number;
    AEOPEBSProjAmount: number;
    CY: string;
    FyQuarter: string;
    CyQuarter: string;
    year: [Month]
}

export interface Month {
    monthName: string;
    coreMS: [Core]
}

export interface Core {
    name: string;
    pProfile: [PProfile]
}

export interface PProfile {
    name: string;
    activityProfile: [ActivityProfile]
}
export interface ActivityProfile {
    name: string;
    hoursAmount: HoursAmount
}

export interface HoursAmount {
    BETEBSProjHours: number
    BETEBSProjAmount: number
    AEOPEBSProjHours: number
    AEOPEBSProjAmount: number
}

export enum FundingStatus {
    p5 = "P4.5+",
    p45 = "P3+",
    p3 = "P3"
}

export enum ActivityDesc {
    security = "SEC",
    PMGT = "PMGT",
    fullStack = "FS",
    MOD = "MOD"
}
export enum CoreMS {
    core = "Core",
    managed = "MS"
}
