import { Component, OnInit } from '@angular/core';
import { SignupData } from 'src/app/Models/register.model';
import { AuthenticateService } from 'src/app/Services/Authentication/authenticate.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authenticate: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  signupButton(formData: SignupData){
    this.authenticate.signup(formData.email, formData.password).subscribe((response: HttpResponse<any>) => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    })
  }

}
