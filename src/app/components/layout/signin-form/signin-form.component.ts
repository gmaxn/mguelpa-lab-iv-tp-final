import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCredentials } from 'src/app/models/user-credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingEventService } from 'src/app/services/loading-event.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  @Output() public autoCompletarDatos: EventEmitter<boolean> = new EventEmitter<boolean>();
  public autoCompletar: boolean = false;
  public form: FormGroup | any;

  @Input() public mode: Observable<string> | any;


  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private _loading: LoadingEventService
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    if (this.mode && this.mode instanceof Observable) {
      this.mode.subscribe(
        value => {
          this.auto(value);
        });
    }

  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  switch() {
    this.autoCompletar = !this.autoCompletar;
    if(!this.autoCompletar) {
      this.form.reset();
    }
    this.autoCompletarDatos.emit(this.autoCompletar);
  }

  signin() {
    this._loading.emitChange(true);
    localStorage.removeItem('user');

    const credentials: UserCredentials = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    this.auth.signIn(credentials).then(
      (ok) => {
        this.router.navigate(['home']);
      },
      (err) => {
        alert(err);
        this.form.reset();
      }
    ).finally(() => { this._loading.emitChange(false) });
  }

  auto(role: string) {
    switch (role) {
      case 'admin':
        this.form.get('username')?.patchValue(`admin@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
      case 'patient-1':
        this.form.get('username')?.patchValue(`fernanda.fernandez@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
      case 'patient-2':
        this.form.get('username')?.patchValue(`gonzalo.gonzalez@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
      case 'specialist-1':
        this.form.get('username')?.patchValue(`hernando.hernandez@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
      case 'specialist-2':
        this.form.get('username')?.patchValue(`gimena.gimenez@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
    }
  }
}
