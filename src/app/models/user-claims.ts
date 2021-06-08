export interface UserClaims {
    uid:string;
    username:string;
    firstname:string;
    lastname:string;
    roles: string[];
    photoUrls: string[];
    isActiveUser: boolean;
}