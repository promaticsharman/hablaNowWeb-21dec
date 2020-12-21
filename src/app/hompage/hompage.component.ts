import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
declare var $;

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.scss']
})
export class HompageComponent implements OnInit {
	section1 = [];
	section2
	section3
	section4
	url
	homePath = environment.home_image;
  constructor(
  	 	private router:Router,
        public formBuilder : FormBuilder,
        public webserviceService : WebServiceService,
        private toastr: ToastrService,
        private sanitizer:DomSanitizer

  	) { }

  	loadSection1(){

  		var obj = {
  			type:'section1'
  		}
          this.webserviceService.homeContent(obj).subscribe(data =>{
              this.section1 = data.data;
            console.log('data+++++++++++',this.section1)

            setTimeout(function(){

	            $('.owl_header').owlCarousel({
			        loop:true,
			        margin:0,
			        dots:false,
			        nav:true,
			        mouseDrag:false,
			        autoplay:true,
			        animateOut: 'slideOutLeft',
			        responsive:{
			            0:{
			                items:1
			            },
			            600:{
			                items:1
			            },
			            1000:{
			                items:1
			            }
			        }
			    });
            },1000)
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
    loadSection2(){

  		var obj = {
  			type:'section2'
  		}
          this.webserviceService.homeContent(obj).subscribe(data =>{
              this.section2.content = data.data[0].content;
              this.section2.video = this.sanitizer.bypassSecurityTrustResourceUrl(data.data[0].video);
              // this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
              this.url = this.section2.video;


              console.log('this.url',this.url)
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
    loadSection3(){

  		var obj = {
  			type:'section3'
  		}
          this.webserviceService.homeContent(obj).subscribe(data =>{
              // this.section2.content = data.data[0].content;
              this.section3.image = data.data[0].image;
            console.log('data+++++++++++',this.section2.image)
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
    loadSection4(){

  		var obj = {
  			type:'section4'
  		}
          this.webserviceService.homeContent(obj).subscribe(data =>{
              this.section4.content = data.data[0].content;
              this.section4.image = data.data[0].image;
            console.log('data+++++++++++))))',this.section4.image)
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
    

  ngOnInit() {
  	this.section2 = {};
  	this.section3 = {};
  	this.section4 = {};
  	
  	 this.loadSection1();
  	 this.loadSection2();
  	 this.loadSection3();
  	 this.loadSection4();
  }

}
