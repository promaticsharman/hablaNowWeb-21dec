import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
    about_us
    homePath = environment.home_image;
    constructor(
        private router:Router,
        public formBuilder : FormBuilder,
        public webserviceService : WebServiceService,
        private toastr: ToastrService
        ) {

    }

  ngOnInit(): void {
      this.loadAboutUs();
      this.about_us = {};
  }


  loadAboutUs(){
        this.webserviceService.aboutUs().subscribe(data =>{
          console.log(data)
            this.about_us.content = data.data.content;
            this.about_us.image = data.data.image;
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

}
