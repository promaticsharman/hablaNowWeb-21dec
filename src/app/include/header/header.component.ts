import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginPermission
  constructor() { }

  ngOnInit() {
    if (localStorage['isLoggedin']) {
      this.loginPermission = JSON.parse(localStorage['isLoggedin'])
      // console.log('this.loginPermission===============',this.loginPermission)
    }
  }

}
