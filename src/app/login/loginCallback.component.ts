import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: ''
})
export class LoginCallbackComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let email = params['username'];
      let token = params['token'];

      if (!!email && !!token) {
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        this.router.navigate(['games']);
      } else {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

}
