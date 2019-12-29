import { Agreement } from "./agreement";
import { Owner } from "./owner";

export interface Sproc {
    attuid: string;
    name: string;
    application: string
    location: string
    projectId: string
    city:string
    program:string
    owner:string
    assignment:string
    rate:number
    startDate:string
    proposedEndDate:string
    actualEndDate:string
    status:string
    endReason:string
    remark: string

}

// export interface Sproc {
//     attuid: string;
//     name: string;
//     application: string
//     location: Location
//     projectId: string
//     city:string
//     program:Program
//     owner:Owner
//     assignment:Agreement
//     rate:number
//     startDate:string
//     proposedEndDate:string
//     actualEndDate:string
//     status:Status
//     endReason:EndReason
//     remark: string

// }

export interface Sprocs{
    sproc: [Sproc]
}

export enum Location {
    onsite = "Onite",
    offshore = "Offshore"
}

export enum Program {
    cc = "CC",
    bb = "BB",
    ar = "AR",
    cld = "CLD"
}
export enum Status {
    active = "Active",
    inactive = "Inactive"
}
export enum EndReason {
    roll = "RollOff",
    CTP = "CTP",
    replaced = "Replaced"
}

