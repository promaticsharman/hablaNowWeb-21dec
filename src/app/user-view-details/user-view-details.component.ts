import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebServiceService } from '../shared/web-service.service';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-user-view-details',
  templateUrl: './user-view-details.component.html',
  styleUrls: ['./user-view-details.component.scss']
})
export class UserViewDetailsComponent implements OnInit {
  userId;
  userData
  userImage
  useCredits = 0
  balanceCredits = 0
  constructor(private route: ActivatedRoute,
    public webServiceService: WebServiceService
  ) {
    this.userId = this.route.snapshot.params.id;
    this.userImage = environment.profile_image
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.getUserData();
  }
  getUserData() {
    this.webServiceService.GetOneUserData(this.userId).subscribe(data => {
      console.log(data);
      this.userData = data.data
      if (this.userData.credits_used_data) {
        this.useCredits = this.userData.credits_used_data.reduce((a, b) => +a + +b.credit_transaction, 0);
        console.log('item=============================', this.useCredits)
      }
      this.balanceCredits = Math.ceil(this.userData.credits - this.useCredits)
    });
  }



}
