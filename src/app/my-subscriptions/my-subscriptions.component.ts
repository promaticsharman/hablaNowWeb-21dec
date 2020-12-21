import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss'],
})
export class MySubscriptionsComponent implements OnInit {
  offset;
  getData;
  limit;
  defaultPagination = 1;
  stripeTest: FormGroup;
  stripePK;
  getSubscription;
  userData;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public webserviceService: WebServiceService,
    private toastr: ToastrService
  ) {
    this.stripePK = environment.stripe_pk;
    if (localStorage.organizationData) {
      this.userData = JSON.parse(localStorage.organizationData); 
      }
  }
  handler: any = null;

  ngOnInit() {
    this.getSubscriptionData();
    this.loadStripe();
    this.getUser();
  }
  getSubscriptionData() {
    console.log(this.userData);
    this.webserviceService.getSubscriptionData(this.userData._id).subscribe(data => {
      console.log(data);
      this.getSubscription = data;
    });
  }

  getPlan(str) {
    return str.split(/(\s+)/)[0];
  }
  getUser() {
    for (let i = 0; i < this.defaultPagination; i++) {
      this.offset = i * 10;
    }
    const limt = 24;
    const order = 1; // 1 for assending or -1 for deassending

    this.webserviceService
      .GetsUBSCRIPTIONPlan(this.offset, limt, order)
      .subscribe(
        (data) => {
          // tslint:disable-next-line: indent
          console.log(data);
          this.getData = data.docs;
          console.log(this.getData);
        },
        (err) => {
          console.log(err);
          // tslint:disable-next-line: triple-equals
          if (err.status == 422) {
            if (err.message) {
              this.toastr.error(err.message, 'Error');
              console.log('Server Encountered Some Error');
            } else if (err.errors) {
              this.toastr.error(err.errors.msg, 'Error');
            }
          } else {
            this.toastr.error('Internet Connection Error', 'Error');
            console.log('Internet Connection Error');
          }
        }
      );
  }
  buySubscription(data, id) {
    console.log('=============================', data, id);
    // tslint:disable-next-line: prefer-const
    let obj = {
      token: data.id,
      sub_id: id
    };
    console.log(obj );
    // tslint:disable-next-line: no-shadowed-variable
    this.webserviceService.BuyOrganizationSubscription(obj).subscribe(data => {
      console.log(data);
    });


  }
  pay(amount, id) {
    // tslint:disable-next-line: prefer-const
    const self = this;
    // tslint:disable-next-line: prefer-const
    let handler = (window as any).StripeCheckout.configure({
      key: this.stripePK,
      locale: 'auto',
      token(token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);

        self.buySubscription(token, id);
        // alert('Token Created!!');
      },
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
    });
  }


  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (window as any).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token(token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
