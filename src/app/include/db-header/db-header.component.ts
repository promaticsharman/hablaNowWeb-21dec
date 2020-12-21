import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-db-header',
  templateUrl: './db-header.component.html',
  styleUrls: ['./db-header.component.scss']
})
export class DbHeaderComponent implements OnInit {
  baseImage
  userData
  constructor(private router: Router) { }

  ngOnInit() {
    this.baseImage = environment.profile_image
    //console.log(this.baseImage)
    if (localStorage['organizationData']) {
      this.userData = JSON.parse(localStorage['organizationData'])

    }
  }

  logOut() {
    // localStorage.removeItem(localStorage['isLoggedin']);
    // localStorage.removeItem(localStorage['organizationData']);
    // localStorage.removeItem(localStorage['token']);
    localStorage.clear();
    // //console.log('sdfsdf=====================',JSON.parse(localStorage['organizationData']))
    this.router.navigate(['/'])

  }

}
