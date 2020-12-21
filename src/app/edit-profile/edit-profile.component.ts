import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
	userData = null
	complexForm: FormGroup;
	profileImage
	profileImage1
	baseImage
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) {

		this.baseImage = environment.profile_image


		this.complexForm = this.formBuilder.group({
			'organization_name': [null, Validators.compose([Validators.required])],
			'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
			'phone': [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15)])]
		})
	}

	ngOnInit() {
		if(localStorage['organizationData']){
			this.userData = JSON.parse(localStorage['organizationData'])

		}
		console.log(this.userData)

	}
	editProfile(){
		// routerLink="/myProfile"
		const formData = new FormData();
		if(this.profileImage !== undefined){

		formData.append('profileImage', this.profileImage);
		}
		formData.append('organization_name', this.userData.organization_name);
		formData.append('email', this.userData.email);
		formData.append('phone', this.userData.phone);
console.log('button click ============================')
		this.webserviceService.EditProfile(formData).subscribe(data =>{
			console.log(data)
			if(data.response){
				localStorage.removeItem(localStorage['organizationData']);
				localStorage['organizationData'] = JSON.stringify(data.data);
				this.toastr.success('Updated Successfully')
				this.ngOnInit()
				this.router.navigate(['/myProfile'])
			}
		},err =>{
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

	onUpload(evt: any) {
		const self = this;
		if (!evt.target) {
			return;
		}
		if (!evt.target.files) {
			return;
		}
		if (evt.target.files.length !== 1) {
			return;
		}
		const file = evt.target.files[0];
		self.profileImage = evt.target.files[0];
		if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'application/pdf') {
			return;
		}
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			let mainImage = fr.result;
			self.profileImage1 = mainImage;
		};
		fr.readAsDataURL(file);
	}

}
