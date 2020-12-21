import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']

})
export class FaqComponent implements OnInit {
    faqs
    constructor(
        private router:Router,
        public formBuilder : FormBuilder,
        public webserviceService : WebServiceService,
        private toastr: ToastrService
        ) {

    }

  ngOnInit(): void {
      this.loadFAQ()
  }
 
  

  loadFAQ(){
        this.webserviceService.faq().subscribe(data =>{
          console.log(data,"hardndk faq")
            this.faqs = data.data;
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
