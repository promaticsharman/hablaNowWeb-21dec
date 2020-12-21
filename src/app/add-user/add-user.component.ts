import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
	userData = null
	complexForm: FormGroup;
	profileImage
	profileImage1
	baseImage
	reqData
    datamodel
    file
	constructor(
		private router:Router,
		public formBuilder : FormBuilder,
		public webserviceService : WebServiceService,
		private toastr: ToastrService
		) {

		this.baseImage = environment.profile_image

        this.datamodel={}

		this.complexForm = this.formBuilder.group({
			'first_name': [null, Validators.compose([Validators.required])],
			'last_name': [null, Validators.compose([Validators.required])],
			'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
			'mobile_number': [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15)])]
		})
	}

  ngOnInit() {
  	this.reqData={}
  }

  onSubmit(){

		var obj ={
			first_name : this.reqData.first_name,
			last_name : this.reqData.last_name,
			email : this.reqData.email,
			mobile_number : this.reqData.mobile_number,
			verified: true
		}
		console.log(obj)
		// return
		this.webserviceService.AddNewUser(obj).subscribe(data =>{
			console.log(data)
			if(data.response==false){
				this.toastr.error(data.message,'Error');
			}
			else if(data.response){
				this.toastr.success('User Add Successfully','Success')
				this.router.navigate(['/myUsers'])

			}
		},err =>{
			console.log(err)

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

    uploadMultipleUser(){
        //alert("Hello");
        //alert(this.datamodel.length)
        if(this.datamodel.csv.length == 0){
            this.toastr.error('Empty CSV file','Error');
            return
        }

        var obj = {
            users : this.datamodel.csv
        }

        // var formData = new FormData();
        // formData.append("users",this.datamodel.csv);
		// return
		this.webserviceService.AddNewUserCSV(obj).subscribe(data =>{
			console.log(data)
            this.toastr.success("Users added Successfully.",'Success')
			this.router.navigate(['/myUsers'])
		},err =>{
			console.log(err)

            var objct = err.message.errors
            this.toastr.error(objct.msg,'Error')
            console.log('Invalid Credential!!!')

			// if(err.status >= 400){
			// 	var objct = err.message.errors
			// 	this.toastr.error(objct.msg,'Error')
			// 	console.log('Invalid Credential!!!')
			// }else {
			// 	this.toastr.error('Internet Connection Error','Error')
			// 	console.log('Internet Connection Error')
			// }
		})
	}

    csvJSON(csv){

      var lines=csv.split("\n");

      var result = [];

      var headers=lines[0].split(",");

      for(var i=1;i<lines.length;i++){
         console.log(lines)
        var obj = {};
        var currentline=lines[i].split(",");
          // obj[headers[j]] = currentline[j];
          if (result.map(item=>{return item.email}).indexOf(currentline[2])==-1 ) {
                obj['first_name']=currentline[0]
                obj['last_name']=currentline[1]
                obj['email']=currentline[2]?currentline[2]:'NA'
                obj['mobile_number']=currentline[3]?currentline[3]:'NA'
                if(obj['mobile_number'] && obj['email'] && obj['last_name'] && obj['first_name']){
                    result.push(obj);
                }


            // code...
          }else{
            alert('Repeted email in csv')
            var inputElement = <HTMLInputElement>document.getElementById('fileupload');
            inputElement.value = '';
            return []
          }

      }
      return result; //JSON
    }



    // fileUpload(event){
    //     this.file = event.target.files[0];
    //     alert("Hello");
    //     console.log(this.file)
    //
    //
    // }
    fileUpload(evt: any) {
      console.log(evt)
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

           const fr = new FileReader();
           fr.onloadend = (loadEvent) => {
             var a = fr.result;
             console.log(a)
             this.datamodel.csv=this.csvJSON(a)
             console.log( this.datamodel.csv);
           };
           fr.readAsText(file);

   }

}
