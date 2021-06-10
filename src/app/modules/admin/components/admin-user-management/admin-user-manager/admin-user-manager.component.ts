import { Component, OnInit } from '@angular/core';
import { SpecialistService } from 'src/app/modules/specialist/services/specialst.service';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.css']
})
export class AdminUserManagerComponent implements OnInit {

  public users: any;
  private errorMessage: string = '';

  constructor(
    private ss: SpecialistService
  ) { }

  ngOnInit(): void {
    this.ss.getAllUsers().subscribe({
      next: users => {
        this.users = users.filter(u => u.claims.roles.includes('specialist'));
      }, 
      error: err => this.errorMessage = err
    });
  }

  changeStatus(user:any) {
    const uid = user.claims.uid;
    const status = !user.claims.isActiveUser;

    this.ss.updateStatus(uid, status);
  }
}