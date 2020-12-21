import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  complexForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public toastr: ToastrService,
    private webServiceService: WebServiceService

  ) {
    this.complexForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
      'name': [null, Validators.compose([Validators.required, Validators.pattern('^[^ ]+[0-9a-zA-Z ]*')])],
      'message': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required])]
    })

  }

  ngOnInit(): void {
  }

  submit() {
    if (this.complexForm.valid) {

      var obj = {
        name: this.complexForm.value.name,
        email: this.complexForm.value.email,
        message: this.complexForm.value.message,
        phone: this.complexForm.value.phone,
      }
      console.log("----", obj)

      this.webServiceService.ContactUs(obj).subscribe(data => {
        console.log(data)
        if (data.code == 200) {
          this.toastr.success("Thank you for contacting us. We will be in touch with you very soon", 'Success')
          this.complexForm.reset()
          this.ngOnInit()
        }
      }, err => {
        console.log(err)
        if (err.status == 422) {
          if (err.message) {
            console.log('Server Encountered Some Error')
          } else if (err.message.errors) {
          }
          else if (err.errors) {
          }
        } else {
          console.log('Internet Connection Error')
        }
      })
    }else{
      this.toastr.warning('please fill the details','Warning')
    }
  }
}
