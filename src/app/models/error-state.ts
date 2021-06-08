export interface ControlStateObject {
    [key:string]:ErrorState;
}
export interface ControlState {
    message:string;
    class:string;
}
export interface ErrorStateObject {
    [key:string]:ErrorState;
}
export interface ErrorState {
    message:string;
    class:string;
}