import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
    HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // const req = request.clone({
  //     headers: request.headers.set('X-DEBUG', 'TESTING')
  // })
  //   return next(req);
  console.log(`${request.method} Outgoing request to ${request.url}`);
  return next(request).pipe(
    tap({
        next: event => {
            if(event.type === HttpEventType.Response) {
                console.log(`${request.method} Incoming response from ${request.url}`);
                console.log(event.status)
                console.log(event.body)
            }
        }
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
