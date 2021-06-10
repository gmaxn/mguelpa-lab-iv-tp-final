import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomCaptchaComponent } from "./components/shared/custom-captcha/custom-captcha.component";
import { AppointmentSelectorComponent } from './components/appointment-request/appointment-selector/appointment-selector.component';
import { AppointmentModalComponent } from './components/shared/appointment-modal/appointment-modal.component';
import { PatientRegistrationFormComponent } from "./modules/patient/components/patient-registration-form/patient-registration-form.component";
import { SpecialistRegistrationFormComponent } from "./modules/specialist/components/specialist-registration/specialist-registration-form/specialist-registration-form.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ],
    declarations: [
      CustomCaptchaComponent,
      AppointmentSelectorComponent,
      AppointmentModalComponent,
      PatientRegistrationFormComponent,
      SpecialistRegistrationFormComponent
    ],
    exports: [
      CustomCaptchaComponent,
      AppointmentSelectorComponent,
      PatientRegistrationFormComponent,
      SpecialistRegistrationFormComponent
    ]
  })
  export class AppCommonModule { }