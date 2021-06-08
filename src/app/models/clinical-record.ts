import { Appointment } from "./appointment";

export interface ClinicalRecord {
    appointment: Appointment;
    uid:string;
    height:number;
    weight:number;
    temperature:number;
    pressure:number;
    dynamic:any;
}
