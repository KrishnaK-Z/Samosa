import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/Services/Authentication/authenticate.service';
import { LoginData } from 'src/app/Models/login.model';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticate: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  loginButton(formData: LoginData){
    this.authenticate.login(formData.email, formData.password).subscribe((response: HttpResponse<any>) => {
      if (response.status) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

}
