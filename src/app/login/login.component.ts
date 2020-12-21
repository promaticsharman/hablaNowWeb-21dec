import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	reqData
	complexForm: FormGroup;
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) {
		this.complexForm = this.formBuilder.group({
			'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
			'password': [null, Validators.compose([Validators.required])]
		})
	}

	ngOnInit() {

		this.reqData = {}
	}

	login(){
		var obj ={
			email: this.reqData.email,
			password: this.reqData.password,
			check: this.reqData.check
		}
		console.log(obj)
		this.webserviceService.login(obj).subscribe(data =>{
			console.log(data)
			//localStorage['token'] = data.token;
			localStorage['token'] = JSON.stringify(data.token);
			console.log(localStorage.getItem('token'))
			// return;
			if(data.token){
				this.toastr.success('You are logged in successfully','Success')
				console.log(data.token)
				localStorage.clear();
				localStorage.setItem('isLoggedin', 'true');
				localStorage['organizationData'] = JSON.stringify(data.user);
				localStorage['token'] = JSON.stringify(data.token);
				this.router.navigate(['/myProfile']);

			}
		},err =>{
			console.log(err)
			if(err.status >= 400){
				var objct = err.message.errors
				this.toastr.error(objct.msg,'Error')
				console.log('Invalid Credential!!!')
			}else {
				this.toastr.error('Internet Connection Error','Error')
				console.log('Internet Connection Error')
			}

		})
	}

}
