import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as Rx from "rxjs/Rx";
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';

// const token = 'Bearer,' + JSON.parse(localStorage.getItem('token'));
var httpOptions: any = {}
if(localStorage.getItem('token')){
 // alert("dsf");
 httpOptions = {
    headers: new HttpHeaders({
      'authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    })
  };
}


@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  // token = localStorage['token']
  apiUrl = environment.endPoint;
  // headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', this.token);

  constructor(private httpClient: HttpClient,public toastr:ToastrService) {
    console.log(httpOptions);
    console.log(JSON.parse(localStorage.getItem('token')));
    // console.log(token);

  }


  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage;
    let obj = {};
    if (error.error instanceof ErrorEvent) {
      obj = {
        message: error.error,
        status: error.status,
      };
      errorMessage = obj;
    } else {
      obj = {
        message: error.error,
        status: error.status,
      };
      errorMessage = obj;
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage.message.errors);
    console.log(errorMessage);
    console.log(error);
    // this.toastr.error(errorMessage.message.errors.msg)
    return throwError(errorMessage);
  }

  // Create
  createTask(data): Observable<any> {
    const API_URL = `${this.apiUrl}/create-task`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }

  // Get
  GetTask(): Observable<any> {
    const API_URL = `${this.apiUrl}/get-task`;
    return this.httpClient.get(API_URL)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }

  // delete
  DeleteTask(id): Observable<any> {
    const API_URL = `${this.apiUrl}/delete-task/{id}`;
    return this.httpClient.get(API_URL)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }

  // Update
  updateTask(id, data): Observable<any> {
    const API_URL = `${this.apiUrl}/update-task/${id}`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  ////login
  login(data): Observable<any> {
    const API_URL = `${this.apiUrl}/organization-login`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  ////sign up
  SignUp(data): Observable<any> {
    const API_URL = `${this.apiUrl}/prepare-organization`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }

  CompleteSignUp(data): Observable<any> {
    const API_URL = `${this.apiUrl}/onboard-organization`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  ////OTP Verify
  OTPVerify(data): Observable<any> {
    const API_URL = `${this.apiUrl}/verify-org-otp`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  ////Edit profile
  EditProfile(data): Observable<any> {
    console.log(data);
    const API_URL = `${this.apiUrl}/edit-org-profile`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  ////Edit profile
  ChangePassword(data): Observable<any> {
    console.log(data);
    const API_URL = `${this.apiUrl}/change-password`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  ////forget password
  RequestForgotOtp(data): Observable<any> {
    const API_URL = `${this.apiUrl}/org/request_forgot_otp`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }

  ResetPassword(data): Observable<any> {
    const API_URL = `${this.apiUrl}/org/reset`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  ////Add User
  AddNewUser(data): Observable<any> {
    const API_URL = `${this.apiUrl}/add-user`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  AddNewUserCSV(data): Observable<any> {
    const API_URL = `${this.apiUrl}/add-user-csv`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  // delete  ?page=${offset}&limit=${limit}
  GetAllUser(page, limit): Observable<any> {
  console.log(httpOptions,"/n/n/n/n/n/n/n/n/n/n");
    const API_URL = `${this.apiUrl}/get-all-user?page=${page}&limit=${limit}`;
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  aboutUs(): Observable<any> {
    const API_URL = `${this.apiUrl}/about-us`;
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  howItWorks(): Observable<any> {
    const API_URL = `${this.apiUrl}/how-its-works`;
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  terms(): Observable<any> {
    const API_URL = `${this.apiUrl}/terms`;
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  homeContent(data): Observable<any> {
    const API_URL = `${this.apiUrl}/home/content`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  faq(): Observable<any> {
    const API_URL = `${this.apiUrl}/faq`;
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  GetsUBSCRIPTIONPlan(page, limit, order): Observable<any> {
    console.log("------------- > ",localStorage.getItem('token'));
    const API_URL = `${this.apiUrl}/get-subscription-plan?page=${page}&limit=${limit}&order=${order}`;
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  BuyOrganizationSubscription(data): Observable<any> {
    const API_URL = `${this.apiUrl}/buy-subscription-plan`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }

  // delete
  GetOneUserData(id): Observable<any> {
    const API_URL = `${this.apiUrl}/get-single-user/${id}`;
    console.log('sdfsdafsdf', API_URL)
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      );
  }
  // delete
  getSubscriptionData(id): Observable<any> {
    const API_URL = `${this.apiUrl}/get-organization-subscription/` + id;
    //console.log('sdfsdafsdf=========================', API_URL)
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      );
  }
  getAllUserList(): Observable<any> {
    const API_URL = `${this.apiUrl}/get-all-users`;
    console.log('sdfsdafsdf=========================', API_URL)
    return this.httpClient.get(API_URL, httpOptions)
      .pipe(
        map(res => {
          return res
        }),
        catchError(this.error)
      );
  }
  transferCreditstoUsers(data): Observable<any> {
    const API_URL = `${this.apiUrl}/transfer/credits/to/users`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
  ContactUs(data): Observable<any> {
    const API_URL = `${this.apiUrl}/contact-us`;
    return this.httpClient.post(API_URL, data, httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.error)
      );
  }
}
