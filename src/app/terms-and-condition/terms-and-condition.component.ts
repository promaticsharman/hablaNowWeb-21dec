import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {

    terms
    constructor(
        private router:Router,
        public formBuilder : FormBuilder,
        public webserviceService : WebServiceService,
        private toastr: ToastrService
        ) {

    }

    loadTerms(){
          this.webserviceService.terms().subscribe(data =>{
            console.log(data)
              this.terms = data.data.content;
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

  ngOnInit(): void {
      this.loadTerms();
  }

}
