import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { provideZoneChangeDetection } from '@angular/core';

// bootstrapApplication(AppComponent, {
//     providers: [
//         provideZoneChangeDetection()
//     ]
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent).catch((err) => console.error(err));
