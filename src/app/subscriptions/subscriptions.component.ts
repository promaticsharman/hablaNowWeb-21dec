import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WebServiceService } from '../shared/web-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-subscriptions',
	templateUrl: './subscriptions.component.html',
	styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

	constructor(
		private router: Router,
		public formBuilder: FormBuilder,
		public webserviceService: WebServiceService,
		private toastr: ToastrService
	) { }
	handler: any = null;
	ngOnInit() {
		// this.loadStripe()
	}
	buyPlan() {
		// this.toastr.success('Registration Successfully', 'Success')
		this.router.navigate(['/login'])
	}

	// loadStripe() {

	// 	if(!window.document.getElementById('stripe-script')) {
	// 	  var s = window.document.createElement("script");
	// 	  s.id = "stripe-script";
	// 	  s.type = "text/javascript";
	// 	  s.src = "https://checkout.stripe.com/checkout.js";
	// 	  window.document.body.appendChild(s);
	// 	}
	// }

	// pay(amount) {

	// 	var handler = (<any>window).StripeCheckout.configure({
	// 		key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
	// 		locale: 'auto',
	// 		token: function (token: any) {
	// 			// You can access the token ID with `token.id`.
	// 			// Get the token ID to your server-side code for use.
	// 			console.log(token)
	// 			alert('Token Created!!');
	// 		}
	// 	});

	// 	handler.open({
	// 		name: 'Demo Site',
	// 		description: '2 widgets',
	// 		amount: amount * 100
	// 	});

	// }

	// loadStripe() {

	// 	if (!window.document.getElementById('stripe-script')) {
	// 		var s = window.document.createElement("script");
	// 		s.id = "stripe-script";
	// 		s.type = "text/javascript";
	// 		s.src = "https://checkout.stripe.com/checkout.js";
	// 		s.onload = () => {
	// 			this.handler = (<any>window).StripeCheckout.configure({
	// 				key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
	// 				locale: 'auto',
	// 				token: function (token: any) {
	// 					// You can access the token ID with `token.id`.
	// 					// Get the token ID to your server-side code for use.
	// 					console.log(token)
	// 					alert('Payment Success!!');
	// 				}
	// 			});
	// 		}

	// 		window.document.body.appendChild(s);
	// 	}
	// }
}
