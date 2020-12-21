import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
userData
baseImage
  constructor(
  		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
  	) { 
    this.baseImage = environment.profile_image
    console.log(this.baseImage)
  	if(localStorage['organizationData']){
		this.userData = JSON.parse(localStorage['organizationData'])
			
		}
  }

  ngOnInit() {
  	console.log(this.userData)
  }

}
