import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	section1
  constructor(
  	private router:Router,
    public formBuilder : FormBuilder,
    public webserviceService : WebServiceService,
    private toastr: ToastrService,
  	) { }

  ngOnInit() {

  	this.section1 = {};
  	this.loadContent();
  }

  	loadContent(){

  		var obj = {
  			type:'footer'
  		}
          this.webserviceService.homeContent(obj).subscribe(data =>{
              this.section1 = data.data[0];
            console.log('data+++++++++++',this.section1)

            
          },err =>{


            if(err.status >= 400){
                // var objct = err.message.errors
                this.toastr.error('Something Wrong','Error')
                console.log('Invalid Credential!!!')
            }else {
                this.toastr.error('Internet Connection Error','Error')
                console.log('Internet Connection Error')
            }
        })
    }

}
