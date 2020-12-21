import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
    content
    homePath = environment.home_image;
    constructor(
        private router:Router,
        public formBuilder : FormBuilder,
        public webserviceService : WebServiceService,
        private toastr: ToastrService
        ) {

    }

  ngOnInit(): void {
      this.loadHow()
      this.content = {};
  }

  loadHow(){
        this.webserviceService.howItWorks().subscribe(data =>{
          console.log(data)
            this.content.content = data.data.content;
            this.content.image = data.data.image;
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
