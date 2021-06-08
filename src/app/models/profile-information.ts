import { UserClaims } from "./user-claims";

export interface ProfileInformation<T> {
    claims: UserClaims;
    data: T
}