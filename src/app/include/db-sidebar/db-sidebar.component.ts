import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { WebServiceService } from '../../shared/web-service.service';
@Component({
	selector: 'app-db-sidebar',
	templateUrl: './db-sidebar.component.html',
	styleUrls: ['./db-sidebar.component.scss']
})
export class DbSidebarComponent implements OnInit {
	userData
	baseImage
	getSubscription
	constructor(
		private router: Router,
		private webserviceService: WebServiceService
	) {
		this.baseImage = environment.profile_image
	}

	ngOnInit() {
		this.userData = JSON.parse(localStorage['organizationData'])
		this.getSubscriptionData()
	}
	getSubscriptionData() {
		//console.log(this.userData);
		this.webserviceService.getSubscriptionData(this.userData._id).subscribe(data => {
			//console.log(data);
			this.getSubscription = data;
		});
	}
	logOut() {
		// localStorage.removeItem(localStorage['isLoggedin']);
		// localStorage.removeItem(localStorage['organizationData']);
		// localStorage.removeItem(localStorage['token']);
		localStorage.clear();
		this.router.navigate(['/'])
	}
}
