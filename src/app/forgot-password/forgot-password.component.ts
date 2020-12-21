import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';

declare var $;

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	reqData
	complexForm: FormGroup;
	Form: FormGroup;
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) {

		this.complexForm = this.formBuilder.group({
			'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],

		})
		this.Form = this.formBuilder.group({
			'otp1': [null, Validators.compose([Validators.required])],
			'otp2': [null, Validators.compose([Validators.required])],
			'otp3': [null, Validators.compose([Validators.required])],
			'otp4': [null, Validators.compose([Validators.required])]
		})
	}

	ngOnInit() {

		$('.otp_fields input').keyup(function(){
			var currleng = $(this).val().length;
			var maxleng = $(this).attr("maxlength");
			if(currleng == maxleng){
				$(this).next().focus();
			}
		});
		$('.otp_fields input').keydown(function(e) {
			if ((e.which == 8 || e.which == 46) && $(this).val() =='') {
				$(this).prev('input').focus();
			}
		});

		this.reqData ={}

	}

	otpVerify(){
		var otp = this.reqData.otp1+this.reqData.otp2+this.reqData.otp3+this.reqData.otp4
		console.log(parseInt(otp))
		var obj ={
			otp : otp
		}
		console.log(obj)
		$('#otpModal').modal('hide')
		this.router.navigate(['/resetPassword'])
		return
		this.webserviceService.OTPVerify(obj).subscribe(data =>{
			console.log(data)
			if(data){
				this.toastr.success('OTP Verified Successfully','Success')
				// localStorage.removeItem(localStorage['signUpData']);

				this.router.navigate(['/login'])
			}

		},err =>{
			console.log(err)
			if(err.status >= 400){
				this.toastr.error('Invalid OTP!!!','Error')
				console.log('Server Encountered Some Error')
			}else {
				this.toastr.error('Internet Connection Error','Error')
				console.log('Internet Connection Error')
			}
		})
	}
	onSubmit(){
		var obj={
			email:this.reqData.email

		}
		console.log(obj)
		this.webserviceService.RequestForgotOtp(obj).subscribe(data =>{
			console.log('data)))++++++++',data)
			localStorage.setItem('userEmail', data.email);
			// console.log('data)))',data)
			$('#otpModal').modal('show')
		},err =>{
			// 	cosnole.log(err)
			this.toastr.error('Internet Connection Error','Error')
			console.log('Internet Connection Error')
		})
				// this.router.navigate(['/login'])
				
	}
			

}
