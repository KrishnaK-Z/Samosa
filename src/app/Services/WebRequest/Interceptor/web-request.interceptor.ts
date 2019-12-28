import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthenticateService } from 'src/app/Services/Authentication/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticateService
  ) { }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
    request = this.addRequestHeader(request);

    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {
          return this.refreshAccessToken().pipe(
            switchMap( ()=>{
              request = this.addRequestHeader(request);
              return next.handle(request);
            } ),
            catchError( (error: any)=>{
              console.log(error);
              this.authService.logout();
              return empty();
            } )
          )
        }
        return throwError(error);
      } )
    )
  }


  /**
   * Add Access Token to the request headers
   * 
   * @param request 
   */
  addRequestHeader (request: HttpRequest<any>) {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      return request.clone({
        setHeaders: {
          'x-access-token': accessToken
        }
      })
    }

    return request;
  }

  /**
   * To refresh the access token
   */
  refreshAccessToken () {
    if (this.refreshingAccessToken) {
      return new Observable (observer => {
        this.accessTokenRefreshed.subscribe(()=>{
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      });
    } else {
      this.refreshingAccessToken = true;

      return this.authService.getNewAccessToken().pipe(
        tap( ()=>{
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        } )
      )
    }
  }

}
