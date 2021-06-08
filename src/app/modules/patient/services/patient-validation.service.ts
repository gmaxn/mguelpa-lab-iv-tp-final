import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ControlStateObject, ErrorState, ErrorStateObject } from 'src/utils/models/error-state';

@Injectable({
  providedIn: 'root'
})
export class PatientValidationService {

  public errors:ErrorStateObject = {
    required: {
      message: 'Campo requerido.',
      class: 'INVALID',
    },
    minRange: {
      message: 'Este campo debe tener por lo menos 3 caracteres.',
      class: 'INVALID',
    },
    maxRange: {
      message: 'Este campo debe tener un maximo de 15 caracteres.',
      class: 'INVALID',
    },
    whiteSpaces: {
      message: 'Este campo no debe contener espacios.',
      class: 'INVALID',
    },
    notNumeric: {
      message: 'Este campo no puede contener caracteres numéricos.',
      class: 'INVALID',
    },
    pattern: {
      message: 'Minimo 8 caracteres y debe ser alfanumérica.',
      class: 'INVALID'
    },
    age: {
      message: 'Formato incorrecto.',
      class: 'INVALID'
    },
    dni: {
      message: 'Formato DNI incorrecto.',
      class: 'INVALID'
    },
    min: {
      message: 'Debajo del mínimo permitido.',
      class: 'INVALID'
    },
    max: {
      message: 'Supero el máximo permitido.',
      class: 'INVALID'
    },
    confirm: {
      message: 'Las claves ingresadas no coinciden.',
      class: 'INVALID'
    },
    email: {
      message: 'Este campo debe ser un email válido.',
      class: 'INVALID',
    },
    succeeded: {
      message: '',
      class: 'VALID'
    },
    extension: {
      message: 'Formato de archivo incorrecto.',
      class: 'INVALID'
    }
  };

  public getState(errorName:string) : ErrorState {
    return this.errors[errorName];
  }

  public setState(controlStates:ControlStateObject, controlName: string, errorState: ErrorState) {
    let name = controlName.replace(/^.+[.]/, '');
    controlStates[name].message = errorState.message;
    controlStates[name].class = errorState.class;
  }

  public clearState(controlStates:ControlStateObject, controlName: string) {
    let name = controlName.replace(/^.+[.]/, '');
    controlStates[name].message = '';
    controlStates[name].class = '';
  }
  
  constructor() { }

  validateNames(c: AbstractControl): { [key: string]: boolean } | null {

    if (c.value?.length < 3) {
      return { 'minRange': true };
    }

    if (c.value?.length > 15) {
      return { 'maxRange': true };
    }

    if (c.value?.includes(' ')) {
      return { 'whiteSpaces': true };
    }

    if (/\d/.test(c.value)) {
      return { 'notNumeric': true };
    }
    return null;
  }

  validateObraSocial(c: AbstractControl): { [key: string]: boolean } | null {

    if (c.value?.length < 4) {
      return { 'minRange': true };
    }

    if (c.value?.length > 8) {
      return { 'maxRange': true };
    }

    if (/\d/.test(c.value)) {
      return { 'notNumeric': true };
    }
    return null;
  }

  validateFileExtension(c: AbstractControl): { [key: string]: boolean } | null {
    if(!/\.(jpe?g|png)$/i.test(c.value)) {
      return { 'extension': true };
    }
    return null;
  }

  validateDNI(c: AbstractControl): { [key: string]: boolean } | null {

    if (!/^\d+$/.test(c.value) || c.value.length < 7 || c.value.length > 9) {
      return { 'dni': true };
    }
    return null;
  }

  validateAge(c: AbstractControl): { [key: string]: boolean } | null {

    if (!/^\d+$/.test(c.value)) {
      return { 'age': true };
    }
    return null;
  }

  passwordCheck(c: AbstractControl): ValidationErrors | null {
    const pass = c.get('password');
    const confirm = c.get('confirm');

    if(pass && confirm) {
      if ((confirm.dirty || confirm.touched) && confirm.value === '') {
        return { 'required': true };
      }
      if (pass.dirty && confirm.value === '') {
        return { 'required': true };
      }
      if (pass.dirty && confirm!.dirty && confirm.value !== pass.value) {
        return { 'confirm': true };
      }
    }
    return null;
  }
}
