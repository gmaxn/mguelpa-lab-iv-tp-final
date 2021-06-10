import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BlobFile } from 'src/app/models/blob-flile';
import { ControlStateObject } from 'src/app/models/error-state';
import { Patient } from 'src/app/models/patient';
import { UserRegistrationData } from 'src/app/models/user-registration-data';
import { LoadingEventService } from 'src/app/services/loading-event.service';
import { MailerService } from 'src/app/services/mailer.service';
import { PatientValidationService } from '../../services/patient-validation.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-registration-form',
  templateUrl: './patient-registration-form.component.html',
  styleUrls: ['./patient-registration-form.component.css']
})
export class PatientRegistrationFormComponent implements OnInit {

  public prompt = false;

  private subscriptions: Subscription[] = [];

  public form: FormGroup | any;

  private controlNames = ['firstname', 'lastname', 'dni', 'age', 'obrasocial', 'photo01', 'photo02', 'username', 'passwordGroup', 'passwordGroup.password', 'passwordGroup.confirm'];

  private pictures: BlobFile[] = [];

  public isValidCaptcha = false;

  public submitted = false;

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
    passwordGroup: {
      message: '',
      class: '',
    },
    photo01: {
      message: '',
      class: '',
    },
    photo02: {
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
    private ps: PatientService,
    private ms: MailerService,
    private _loading: LoadingEventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.watchForm(...this.controlNames);
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
      obrasocial: ['', [Validators.required]],
      photo01: ['', [Validators.required, this.pv.validateFileExtension]],
      photo02: ['', [Validators.required, this.pv.validateFileExtension]]
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

  captchaValidation(input:boolean) {

    this.isValidCaptcha = input;

  }

  submit() {

    this.submitted = true;

    this.controlNames.map(name => {
      const ctrl = this.form.get(name);
      ctrl.markAllAsTouched();
      this.setMessage(ctrl, name)
    });

    if (this.form.status === "VALID" && this.isValidCaptcha) {

      const profile: UserRegistrationData<Patient> = {
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
            roles: ["user", "patient"],
            photoUrls: [],
            isActiveUser: false
          },
          data: {
            firstname: this.form.get('firstname').value,
            lastname: this.form.get('lastname').value,
            age: this.form.get('age').value,
            dni: this.form.get('dni').value,
            obrasocial: this.form.get('obrasocial').value,
          }
        }
      }
      this._loading.emitChange(true);
      this.ps.registerPatient(profile, this.pictures).then(uid => {

            const body = {
              uid: uid,
              email: this.form.get('username').value,
              subject: "Activación de usuario - Clínica OMED"
            };

            this.ms.sendMessage(body).subscribe(() => {

        });

      }).finally(() => {

        this._loading.emitChange(false);
        alert("Registro exitoso, revise su email para activar su cuenta.");
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
    this.form.get('obrasocial').patchValue("OSDE 310");

    this.form.get('photo01').patchValue("");
    this.form.get('photo02').patchValue("");

    // const doc1 = <HTMLInputElement>document.getElementById('photo01');
    // const doc2 = <HTMLInputElement>document.getElementById('photo02');

    // doc1.value = "c:/test1.jpeg";
    // doc2.value = "c:/test2.jpeg";

    this.form.markAllAsTouched();
  }
}