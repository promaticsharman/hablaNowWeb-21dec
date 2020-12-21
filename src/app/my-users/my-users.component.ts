import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
@Component({
	selector: 'app-my-users',
	templateUrl: './my-users.component.html',
	styleUrls: ['./my-users.component.scss']
})
export class MyUsersComponent implements OnInit {
	baseImage
	setSearch
	defaultPagination=1
	offset
	collectionSize:number
	setPage
	getData
	page:number = 1
	p: number = 1;
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) {
		this.baseImage = environment.user_profile_image
		console.log(this.baseImage)
		this.offset=0
		this.setSearch=0
		this.collectionSize=0
		this.setPage=10
	}

	ngOnInit() {
		this.getUser()
	}

	getUser(){
		for (var i = 0; i < this.defaultPagination; i++) {
			this.offset=(i*10)
		}
		var limt=10

		this.webserviceService.GetAllUser(this.offset,limt).subscribe(data =>{
			console.log(data)
			this.getData = data.docs;
			this.collectionSize = data.totalDocs;
			console.log(this.getData)
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

		// GetAllUser
	}

}
