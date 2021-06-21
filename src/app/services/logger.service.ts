import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(
    private db: AngularFirestore
  ) { }

  public async log(user: any) {
    const ref = this.db.collection<Log>("logs").doc(user.claims.uid);
    ref.get().toPromise().then(doc => {
      ref.set({
        uid: user!.claims.uid,
        user: user!.claims.username,
        date: new Date(Date.now()),
        logs: doc.data()?.logs ? +(doc.data()!.logs + 1) : 1,
        roles: user!.claims.roles
      });
    });
  }
  
  public getLogs() {
    return this.db.collection<Log>("logs").valueChanges();
  }
}
export interface Log {
  uid: string;
  date: Date;
  logs: number;
  user: string;
  roles: string[];
}