import { Component, OnInit } from '@angular/core';
declare var $;
import { ActivatedRoute, Router } from '@angular/router';
import { WebServiceService } from '../shared/web-service.service';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-transfer-credit',
  templateUrl: './transfer-credit.component.html',
  styleUrls: ['./transfer-credit.component.scss']
})
export class TransferCreditComponent implements OnInit {
  userId
  userData
  organizationData
  userList
  getSubscription
  selectedQuantity
  constructor(
    private route: ActivatedRoute,
    public webServiceService: WebServiceService,
    public toastr: ToastrService,
    private router: Router

  ) {

    this.userId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.selectedQuantity=''
    this.userData = {}
    if (localStorage['organizationData']) {
      this.organizationData = JSON.parse(localStorage['organizationData'])

      this.getSubscriptionData()
    }
    this.getUserData();
    $('.slc_pckr').selectpicker();
    this.getCreditSenderUserList();
  }

  getSubscriptionData() {
    console.log(this.userData);
    this.webServiceService.getSubscriptionData(this.organizationData._id).subscribe(data => {
      console.log(data);
      this.getSubscription = data.no_of_credits;
      console.log('this.getSubscription===========this.getSubscription',this.getSubscription)

    });
  }

  getCreditSenderUserList() {

    this.webServiceService.getAllUserList().subscribe(data => {
      console.log('get all user data ===========================check=========', data)
      if (data.list) {

        var filteredAry = data.list.filter(e => e._id !== this.userData._id)
        console.log('filteredAry==========', filteredAry)
        var ob={
          credits: this.getSubscription,
          first_name: this.organizationData.organization_name,
          id: this.organizationData._id,
          last_name: " ",
          _id: this.organizationData._id,
        }
        console.log('asgdki juha=======',ob)
        this.userList = [ob, ...filteredAry]
        console.log('dsjgfdk k========', this.userList)
      }
    })

  }
  creditTransfer() {
    if(!this.selectedQuantity){
      this.toastr.warning('please choose sender id','Warning');
      return
    }
    if(!this.userData.amount){
      this.toastr.warning('please enter credit','Warning');
      return
    }
    var obj = {}
    if(this.selectedQuantity === this.organizationData._id){
       obj = {
        receiver_id: this.userData._id,
        no_of_credit_transfer : this.userData.amount,
        transferBy : 'organization'
      }
    }else{
       obj = {
        receiver_id: this.userData._id,
        no_of_credit_transfer : this.userData.amount,
        transferBy : 'organization_user',
        sender_id : this.selectedQuantity
      }
    }
    console.log('kbhkjashbd = ============', obj)
    this.webServiceService.transferCreditstoUsers(obj).subscribe(data =>{
      console.log( data)
      if(data.code == 200){
        this.toastr.success('Credit transfer successfully','Success')
        this.router.navigate(['/organization-user-detail',this.userData._id])
        
      }

    },err =>{
			console.log(err)
			if(err.status == 422 ){
				if(err.message){
				this.toastr.error(err.message.errors.msg,'Error')
				console.log('Server Encountered Some Error')
				}else if(err.errors){
					this.toastr.error(err.errors.msg,'Error')
				}
			}else {
				this.toastr.error('Internet Connection Error','Error')
				console.log('Internet Connection Error')
			}
		})
  }

  getUserData() {
    this.webServiceService.GetOneUserData(this.userId).subscribe(data => {
      console.log(data);
      this.userData = data.data
      this.userData.name = this.userData.first_name + ' ' + this.userData.last_name
    });
  }

}
