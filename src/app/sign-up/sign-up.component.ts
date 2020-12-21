import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
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
	separateDialCode = true;
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
		this.complexForm = this.formBuilder.group({
			'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
			'password': [null, Validators.compose([Validators.required,Validators.minLength(8)])],
			'organizationName': [null, Validators.compose([Validators.required])],
			'phone': [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15)])],
			'confirm_password': [null, Validators.compose([Validators.required,Validators.minLength(8)])]
		})


	}

	ngOnInit() {
		this.reqData = {}
		this.reqData.phone="";
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

	getOTP(){
		var obj ={
			email : this.reqData.email,
			password : this.reqData.password,
			organization_name : this.reqData.organizationName,
			phone : this.reqData.phone.dialCode+this.reqData.phone.number
		}
		console.log(obj)
		// return
		this.webserviceService.SignUp(obj).subscribe(data =>{
			console.log(data)
			if(data.response==false){
				this.toastr.error(data.message,'Error');
			}
			else if(data.response){
				this.toastr.success('OTP Send Successfully','Success')
				localStorage['signUpData'] = JSON.stringify(data.data);
				localStorage['otp_received']=data.otp;
				localStorage['country_code']=this.reqData.phone.countryCode;
				localStorage['number']=this.reqData.phone.number;
				localStorage.setItem('setTime', 'true');
				this.router.navigate(['/enterOTP'])

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

}
