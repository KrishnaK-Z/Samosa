import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(
    private http: HttpClient
  ) {
    this.ROOT_URL = "http://127.0.0.1:3000";
   }
   

   /**
    * Get web request
    * 
    * @param uri string
    * @return Observable
    */
   get (uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   /**
    * Post web request
    */
   post (uri:string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
   }

   /**
    * Update web request
    */
   patch (uri:string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
   }

   /**
    * Delete web request
    */
   delete (uri: string) {
     return this.http.delete(`${this.ROOT_URL}/${uri}`);
   }

   /**
    * Login
    */
   login (email: string, password: string) {
      return this.http.post(`${this.ROOT_URL}/user/login`,{
        email,
        password
      },
      {
        observe: 'response'
      });
   }

   /**
    * Register
    */
   register (email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user/register`,{
      email,
      password
    },
    {
      observe: 'response'
    });
   }

   /**
    * Get the access token
    * 
    * @param accessToken 
    * @param refreshToken 
    */
    getAccessToken (_id: string, refreshToken: string) {
      return this.http.get(`${this.ROOT_URL}/user/me/auth`, {
        headers: {
          _id,
          'x-refresh-token': refreshToken 
        },
        observe: 'response'
      });
    }
}
