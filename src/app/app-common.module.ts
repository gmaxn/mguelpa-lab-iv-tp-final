import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomCaptchaComponent } from "./components/shared/custom-captcha/custom-captcha.component";
import { AppointmentSelectorComponent } from './components/appointment-request/appointment-selector/appointment-selector.component';
import { AppointmentModalComponent } from './components/shared/appointment-modal/appointment-modal.component';
import { PatientRegistrationFormComponent } from "./modules/patient/components/patient-registration-form/patient-registration-form.component";
import { SpecialistRegistrationFormComponent } from "./modules/specialist/components/specialist-registration/specialist-registration-form/specialist-registration-form.component";
import { ModalComponent } from "./components/layout/modal/modal.component";
import { CustomDatePipe } from "./utils/pipes/custom-date.pipe";
import { BadgeDirective } from './utils/directives/badge.directive';
import { StatusPipe } from './utils/pipes/status.pipe';
import { PillEnableDirective } from './utils/directives/pill-enable.directive';
import { ChartsModule } from "ng2-charts";
import { TranslatorPipe } from './utils/pipes/translator.pipe';
import { BlurDirective } from './utils/directives/blur.directive';
import { HideDirective } from './utils/directives/hide.directive';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ChartsModule
    ],
    declarations: [
      CustomCaptchaComponent,
      AppointmentSelectorComponent,
      AppointmentModalComponent,
      PatientRegistrationFormComponent,
      SpecialistRegistrationFormComponent,
      ModalComponent,
      CustomDatePipe,
      BadgeDirective,
      StatusPipe,
      PillEnableDirective,
      TranslatorPipe,
      BlurDirective,
      HideDirective,
    ],
    exports: [
      CustomCaptchaComponent,
      AppointmentSelectorComponent,
      PatientRegistrationFormComponent,
      SpecialistRegistrationFormComponent,
      ModalComponent,
      CustomDatePipe,
      BadgeDirective,
      StatusPipe,
      PillEnableDirective,
      TranslatorPipe,
      BlurDirective,
      HideDirective
    ]
  })
  export class AppCommonModule { }