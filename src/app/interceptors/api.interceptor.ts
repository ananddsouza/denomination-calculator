import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add new headers
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        // Add your auth token here if needed
        // Authorization: `Bearer YOUR_AUTH_TOKEN`,
      },
    });

    // Handle the HTTP request
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors globally
        console.error('Error occurred:', error);
        /* Optionally, you can show user-friendly messages or perform some 
        actions */
        return throwError(
          () => new Error('An error occurred; please try again later.')
        );
      })
    );
  }
}
