import { Injectable } from '@angular/core';
import { WebRequestService } from 'src/app/Services/WebRequest/web-request.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private webRequestService: WebRequestService,
    private route: Router
  ) { }

  login(email: string, password: string){
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap( (response: HttpResponse<any>) =>{
        // the auth tokens will be in the header of this response
        this.setSession(response.body._id, response.headers.get('x-access-token'), response.headers.get('x-refresh-token'));
        console.log("Logged In");
        console.log(response);
      } )
    );
  }

  signup(email: string, password: string) {
    return this.webRequestService.register(email, password).pipe(
      shareReplay(),
      tap((response: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(response.body._id, response.headers.get('x-access-token'), response.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    );
  }

  logout(){
    this.removeSession();
    this.route.navigate(['/login']);
  }

  /**
   * Stores the userID and tokens
   */
  private setSession = (userId: string, accessToken: string, refreshToken: string) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  private removeSession = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  public getAccessToken () {
    return localStorage.getItem('x-access-token') ? localStorage.getItem('x-access-token') : "";
  }

  public getRefreshToken () {
    return localStorage.getItem('x-refresh-token') ? localStorage.getItem('x-refresh-token') : "";
  }

  public getUserId () {
    return localStorage.getItem('userId') ? localStorage.getItem('userId') : "";
  }

  public setAccessToken (accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  public getNewAccessToken () {
    return this.webRequestService.getAccessToken(this.getUserId(), 
          this.getRefreshToken()).pipe(
              tap( (response: HttpResponse<any>) => {
                this.setAccessToken(response.headers.get('x-access-token'));
              } )
            );
  }

}
