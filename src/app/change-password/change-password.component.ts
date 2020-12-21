import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	reqData
	p_false
	complexForm: FormGroup;
	values
	userData
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) { 
		this.complexForm = this.formBuilder.group({
			'old_password': [null, Validators.compose([Validators.required,Validators.minLength(8)])],
			'new_password': [null, Validators.compose([Validators.required,Validators.minLength(8)])],
			'confirm_password': [null, Validators.compose([Validators.required,Validators.minLength(8)])]
		})

		if(localStorage['organizationData']){
			this.userData = JSON.parse(localStorage['organizationData'])
			
		}
	}

	ngOnInit() {
		this.reqData = { }
	}
	changePassword(){
		var obj={
			oldpassword: this.reqData.old_password,
			password: this.reqData.new_password,
		}
		console.log(obj)
		this.webserviceService.ChangePassword(obj).subscribe(data =>{
			console.log(data)
			if(data.response){
				this.toastr.success(data.message,'Success')
				this.router.navigate(['/myProfile'])
			}
		},err =>{
			console.log(err)
			console.log(err)
			if(err.status >= 400){
				this.toastr.error('Incorrect old password','Error')
				console.log('Invalid Credential!!!')
			}else {
				this.toastr.error('Internet Connection Error','Error')
				console.log('Internet Connection Error')
			}
		})
	}
	onKey(event: any) {
		this.values = event.target.value;
		if (this.reqData.new_password == this.values) {
			this.p_false = false;
		} else {
			this.p_false = true;
		}
	}

}
