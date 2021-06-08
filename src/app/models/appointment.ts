import { Patient } from "./patient";
import { ProfileInformation } from "./profile-information";
import { Specialist } from "./specialist";

export interface Appointment {
    uid: string;
    date: Date;
    isActive: boolean;
    isTaken: boolean;
    isCancelled: boolean;
    specialist: ProfileInformation<Specialist> | any;
    patient: ProfileInformation<Patient> | any;
    speciality: string;
    status:string;
    review:any;
    diagnosis:string;
    survey:any;
    rating?:number;
}

export class DatePicker {

    private cursor: Date = this.now;
    private week: Date[] = [];

    private get now() : Date {
        return new Date(Date.now());
    }

    public get currentWeek(): Date[] {
        this.setCursor(this.now);
        return this.week;
    }

    public get previousWeek(): Date[] {
        this.setCursor(new Date(this.cursor.getTime() - 60 * 60 * (168) * 1000));
        return this.week;
    }

    public get nextWeek(): Date[] {
        this.setCursor(new Date(this.cursor.getTime() + 60 * 60 * (168) * 1000));
        return this.week;
    }

    public get month(): number {
        return this.now.getMonth();
    }

    public get currentDay(): number {
        return this.now.getDay();
    }

    constructor() {
        this.setCursor(this.now);
    }

    private setCursor(startDate: Date) {
        switch (startDate.getDay()) {
            case 1:
                this.cursor = startDate;
                this.setWeek();
                break;
            case 2:
                this.setCursor(new Date(startDate.getTime() - 60 * 60 * 24 * 1000));
                break;
            case 3:
                this.setCursor(new Date(startDate.getTime() - 60 * 60 * 48 * 1000));
                break;
            case 4:
                this.setCursor(new Date(startDate.getTime() - 60 * 60 * 72 * 1000));
                break;
            case 5:
                this.setCursor(new Date(startDate.getTime() - 60 * 60 * 96 * 1000));
                break;
            case 6:
                this.setCursor(new Date(startDate.getTime() - 60 * 60 * 120 * 1000));
                break;
            case 0:
                this.setCursor(new Date(startDate.getTime() + 60 * 60 * 24 * 1000));
                break;
        }
    }

    private setWeek() {
        this.week = [];
        for (let index = 0; index < 6; index++) {
            const newDate = new Date(this.cursor.getTime() + 60 * 60 * (index * 24) * 1000);
            this.week.push(newDate);
        }
    }

    public goto(cursor:number) {
        this.setCursor(new Date(new Date(this.now.getTime() + 60 * 60 * (cursor * (168)) * 1000)));
        return this.week;
    }
}
