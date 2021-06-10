import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BlobFile } from 'src/app/models/blob-flile';
import { ControlStateObject } from 'src/app/models/error-state';
import { Specialist } from 'src/app/models/specialist';
import { UserRegistrationData } from 'src/app/models/user-registration-data';
import { PatientValidationService } from 'src/app/modules/patient/services/patient-validation.service';
import { LoadingEventService } from 'src/app/services/loading-event.service';
import { MailerService } from 'src/app/services/mailer.service';
import { SpecialistService } from '../../../services/specialst.service';

@Component({
  selector: 'app-specialist-registration-form',
  templateUrl: './specialist-registration-form.component.html',
  styleUrls: ['./specialist-registration-form.component.css']
})
export class SpecialistRegistrationFormComponent implements OnInit {

  public isValidCaptcha = false;

  public submitted = false;

  public prompt = false;

  private subscriptions: Subscription[] = [];

  public form: FormGroup | any;

  private controlNames = ['firstname', 'lastname', 'dni', 'age', 'speciality', 'photo01', 'username', 'passwordGroup', 'passwordGroup.password', 'passwordGroup.confirm'];

  private pictures: BlobFile[] = [];

  public states: ControlStateObject = {
    firstname: {
      message: '',
      class: ''
    },
    lastname: {
      message: '',
      class: ''
    },
    dni: {
      message: '',
      class: ''
    },
    age: {
      message: '',
      class: ''
    },
    username: {
      message: '',
      class: ''
    },
    password: {
      message: '',
      class: '',
    },
    confirm: {
      message: '',
      class: '',
    },
    obrasocial: {
      message: '',
      class: '',
    },
    speciality: {
      message: '',
      class: '',
    },
    passwordGroup: {
      message: '',
      class: '',
    },
    photo01: {
      message: '',
      class: '',
    }
  };

  setMessage(c: AbstractControl, controlName: string) {
    this.pv.clearState(this.states, controlName);
    if (c.errors && (c.touched || c.dirty)) {
      let errorName = Object.keys(c.errors)[0];
      this.pv.setState(this.states, controlName, this.pv.getState(errorName));
    }
    if (!c.errors && (c.touched || c.dirty)) {
      this.pv.setState(this.states, controlName, this.pv.getState('succeeded'));
    }
  }

  constructor(
    private fb: FormBuilder,
    private pv: PatientValidationService,
    private ss: SpecialistService,
    private ms: MailerService,
    private _loading: LoadingEventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.watchForm(...this.controlNames);
  }

  captchaValidation(input:boolean) {
    this.isValidCaptcha = input;
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      uid: [''],
      firstname: ['', [Validators.required, this.pv.validateNames]],
      lastname: ['', [Validators.required, this.pv.validateNames]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(105), this.pv.validateAge]],
      username: ['', [Validators.required, Validators.email]],
      passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern(/^(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d).{8,}$/)]),
        confirm: new FormControl(''),
      }, this.pv.passwordCheck),
      dni: ['', [Validators.required, this.pv.validateDNI]],
      speciality: ['', [Validators.required]],
      photo01: ['', [Validators.required, this.pv.validateFileExtension]]
    });
  }

  watchForm(...controlNames: string[]) {
    controlNames.map(name => {
      const ctrl = this.form.get(name);
      if (ctrl !== null) {
        const c = ctrl.valueChanges.pipe(debounceTime(1000));
        const subscription = c.subscribe(() => {
          this.setMessage(ctrl, name);
        });
        this.subscriptions.push(subscription);
      }
    });
  }

  check(name: string) {
    const ctrl = this.form.get(name)
    if (ctrl.errors && (ctrl.touched || ctrl.dirty)) {
      return ctrl.errors;
    }
  }

  submit() {

    this.submitted = true;

    this.controlNames.map(name => {
      const ctrl = this.form.get(name);
      ctrl.markAllAsTouched();
      this.setMessage(ctrl, name)
    });

    if (this.form.status === "VALID" && this.isValidCaptcha) {

      const profile: UserRegistrationData<Specialist> = {
        credentials: {
          username: this.form.get('username').value,
          password: this.form.get('passwordGroup.password').value,
        },
        profile: {
          claims: {
            uid: '',
            username: this.form.get('username').value,
            firstname: this.form.get('firstname').value,
            lastname: this.form.get('lastname').value,
            roles: ["user", "specialist", this.form.get('speciality').value],
            photoUrls: [],
            isActiveUser: false
          },
          data: {
            firstname: this.form.get('firstname').value,
            lastname: this.form.get('lastname').value,
            age: this.form.get('age').value,
            dni: this.form.get('dni').value,
            speciality: this.form.get('speciality').value,
          }
        }
      }
      this._loading.emitChange(true);
      this.ss.registerSpecialist(profile, this.pictures).finally(() => {
        this._loading.emitChange(false);
        alert("Registro exitoso, contacte a un administrador para activar su cuenta.");
        this.router.navigate(['signin']); 
      });
    } else {
      //alert('false');
    }
  }

  onFileSelection01(event: any): void {
    if (event.target.files.length === 1) {
      this.pictures.push({
        filename: event.target.files[0].name,
        stream: event.target.files[0],
        contentType: 'image/jpeg'
      });
    }
  }

  onFileSelection02(event: any): void {
    if (event.target.files.length === 1) {
      this.pictures.push({
        filename: event.target.files[0].name,
        stream: event.target.files[0],
        contentType: 'image/jpeg'
      });
    }
  }

  auto() {

    this.form.get('username')?.patchValue(`test_${Date.now()}@user.com`);
    this.form.get('passwordGroup.password')?.patchValue("123456Q!");
    this.form.get('passwordGroup.confirm')?.patchValue("123456Q!");

    this.form.get('firstname').patchValue("John");
    this.form.get('lastname').patchValue("Doe");
    this.form.get('dni').patchValue("12345678");
    this.form.get('age').patchValue("31");
    this.form.get('speciality').patchValue("clínica");

    this.form.get('photo01').patchValue("");

    // const doc1 = <HTMLInputElement>document.getElementById('photo01');
    // const doc2 = <HTMLInputElement>document.getElementById('photo02');

    // doc1.value = "c:/test1.jpeg";
    // doc2.value = "c:/test2.jpeg";

    this.form.markAllAsTouched();
  }
}