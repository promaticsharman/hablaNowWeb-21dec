import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { getCode, getName } from 'country-list';


declare var $;

@Component({
	selector: 'app-enter-otp',
	templateUrl: './enter-otp.component.html',
	styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
	signUpData
	otp_received
	reqData
	complexForm: FormGroup;
	editForm: FormGroup;
	country_code
	number
	timeleft = 0
	timeValid = true
	separateDialCode = true;
	country_name
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) {
		if(localStorage['signUpData']){
		this.country_code=localStorage['country_code'];
		this.otp_received=localStorage['otp_received'];
		this.number=localStorage['number'];
		this.signUpData = JSON.parse(localStorage['signUpData'])
		//this.signUpData.phone=this.number;
		this.country_name="CountryISO"+getName(this.country_code);
		}
		console.log(this.signUpData)


		this.complexForm = this.formBuilder.group({
			'otp1': [null, Validators.compose([Validators.required])],
			'otp2': [null, Validators.compose([Validators.required])],
			'otp3': [null, Validators.compose([Validators.required])],
			'otp4': [null, Validators.compose([Validators.required])]
		})
		this.editForm = this.formBuilder.group({
			'phone': [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15)])]
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

		this.reqData = {}

		if(localStorage.getItem('setTime')){
			this.timeleft = 60;
			var self = this
			var downloadTimer = setInterval(function(){
				self.timeleft -= 1;
				if(self.timeleft <= 0){
					localStorage.removeItem(localStorage['setTime']);
					// this.timeValid = false
					clearInterval(downloadTimer);

				}
				console.log(self.timeleft)
			}, 1000);

		}
	}

	getOTP(){
		var obj =this.signUpData
		console.log(obj)
		// return
		this.webserviceService.SignUp(obj).subscribe(data =>{
			console.log(data)
			if(data.response==false){
				this.toastr.error(data.message,'Error');
			}
			else if(data.response){
				this.toastr.success('OTP Sent Successfully!','Success')
				localStorage['signUpData'] = JSON.stringify(data.data);
				localStorage['otp_received']=data.otp;

				localStorage.setItem('setTime', 'true');
				this.otp_received=data.otp;
				//this.router.navigate(['/enterOTP'])

			}
		},err =>{
			console.log(err)
			if(err.status == 422 ){
				if(err.message){
				this.toastr.error(err.message,'Error')
				console.log('Server Encountered Some Error')
				}else if(err.errors){
					this.toastr.error(err.errors.msg,'Error')
				}
			}else {
				this.toastr.error('Internet Connection Error','Error')
				console.log('Internet Connection Error')
			}
		})

	}
	onOtpChange(event){
		console.log(event)
	}
	reSendOTP(){

		// this.timeValid = true
		if(this.timeleft> 0){
			this.toastr.error('Please wait for '+ this.timeleft.toString() +' seconds','Please Wait..')
		}else {
			localStorage.setItem('setTime', 'true');
			console.log(localStorage.getItem('setTime'))
		this.ngOnInit()
		this.getOTP();
		}
	}
	updatePhone(){
		var obj={
			phone: this.signUpData.phone
		}
		console.log(obj)
		this.ngOnInit()
		this.getOTP()
		$('#numb_mod').modal('hide');
	}
	OTPCheck(){
	//	console.log(	this.otp_received )
		// routerLink="/subscriptions"

		var otp = this.reqData.otp1+this.reqData.otp2+this.reqData.otp3+this.reqData.otp4
		if(this.otp_received==otp){

		console.log(parseInt(otp))
		var obj =this.signUpData;
		console.log(obj)
		this.webserviceService.CompleteSignUp(obj).subscribe(data =>{
			console.log(data)
			if(data){
				this.toastr.success('Your Account has been created successfully! Please verify your email through link sent on your registered email address','Success')
				localStorage.removeItem(localStorage['signUpData']);

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
	}else{
		this.toastr.error('Incorrect OTP!!!','Error')
	}
	}


}
