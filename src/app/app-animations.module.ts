import { trigger, animate, transition, style, group, query} from '@angular/animations';


export const specialistRegistrationEntersAnimation = trigger('specialistRegistrationEnters', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);


export const routesSlideinAnimation = trigger('slideInAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);

export const sideNavAnimation = trigger('openClose', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
      backgroundColor: 'rgba(30,30,30,0)'
    }),
    animate('0.2s 100ms ease-out', style({
      transform: 'translateX(0%)',
    })),
    animate('0.3s 100ms ease-in', style({
      backgroundColor: 'rgba(30,30,30,0.5)'
    })),
  ]),
  transition(':leave', [
    animate('0.3s 100ms ease-in', style({
      backgroundColor: 'rgba(30,30,30,0)'
    })),
    animate('0.2s 100ms ease-in', style({
      transform: 'translateX(-100%)',
      backgroundColor: 'rgba(30,30,30,0)'
    }))
  ])
]);

export const promptSlideAnimation = trigger('prompt', [
  transition(':enter', [
    style({
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '-100%',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'rgba(30,30,30,0)'
    }),
    animate('0.2s 100ms ease-out', style({
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    })),
    animate('0.5s 100ms ease-out', style({
      backgroundColor: 'rgba(30,30,30,0.5)'
    })),
  ]),
  transition(':leave', [
    animate('0.5s 100ms ease-out', style({
      backgroundColor: 'rgba(30,30,30,0)'
    })),
    animate('0.2s 100ms ease-out', style({
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '-100%',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
    }))
  ])
]);

export const slideInAnimation = trigger('routeAnimations', [
  transition('EnrollmentPage <=> SpecialistRegistration', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ]),
  transition('EnrollmentPage <=> PatientRegistration', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
      ], { optional: true })
    ])
  ]),
  transition('HomePage <=> EnrollmentPage', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(100%)' }))
      ], { optional: true })
    ])
  ])
]);