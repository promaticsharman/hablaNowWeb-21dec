import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	reqData
	complexForm: FormGroup;
	p_false
	values
	token
	lowerCase: boolean = false;
	upperCase: boolean = false
	specialCase: boolean = false;
	lengthCase: boolean = false;
	numberCase: boolean = false;
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) { 
		this.complexForm = this.formBuilder.group({
			'newPassword': [null, Validators.compose([Validators.required,Validators.minLength(8)])],
			'confirmPassword': [null, Validators.compose([Validators.required,Validators.minLength(8)])]
		})
	}

	ngOnInit() {
		this.reqData = {}
		// console.log('*************',localStorage.getItem('userId'));
	}
	onKey(event: any) {
		this.values = event.target.value;
		if (this.reqData.password == this.values) {
			this.p_false = false;
		} else {
			this.p_false = true;
		}
	}
	checkPassword(str) {
		this.lowerCase = (/[a-z]/.test(str));
		this.upperCase = (/[A-Z]/.test(str));
		this.numberCase = (/[0-9]/.test(str));
		this.lengthCase = str.length >= 8 ? true : false;
		this.specialCase = (/[!@#\$%\^&\*\)\(\-_=+]/.test(str));
		console.log(str)
		console.log(this.lowerCase)
		console.log(this.upperCase)
		console.log(this.numberCase)
		console.log(this.lengthCase)
		console.log(this.specialCase)

	}
	onSubmit(){
		var obj ={
			email : localStorage.getItem('userEmail'),
			newPassword : this.reqData.newPassword,
			confirmPassword : this.reqData.confirmPassword,
		}
		console.log(obj)
		this.webserviceService.ResetPassword(obj).subscribe(data =>{
			console.log('data)))',data)
			if(data.ok == 1){
				this.toastr.success('Password updated successfully','Success')
				this.router.navigate(['/login'])
			}
			// $('#otpModal').modal('show')
		},err =>{
			// 	cosnole.log(err)
			this.toastr.error('Internet Connection Error','Error')
			console.log('Internet Connection Error')
		})
		console.log(obj)
	}
}
