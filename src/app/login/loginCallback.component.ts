import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: ''
})
export class LoginCallbackComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //Get the query paramters from the url
    this.activatedRoute.queryParams.subscribe(params => {
      let email = params['username'];
      let token = params['token'];

      //Are the parameters set
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
