import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    if (this.api.isLoggedIn) {
      this.router.navigate(['games']);
    }
  }

  public login() {
    location.href = this.api.loginUrl;
  }
}
