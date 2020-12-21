import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { WebServiceService } from './shared/web-service.service';
import { AuthGuardGuard } from './shared/auth-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HompageComponent } from './hompage/hompage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { DbHeaderComponent } from './include/db-header/db-header.component';
import { DbSidebarComponent } from './include/db-sidebar/db-sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MyUsersComponent } from './my-users/my-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreditsComponent } from './user-credits/user-credits.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { TransferCreditComponent } from './transfer-credit/transfer-credit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgOtpInputModule } from  'ng-otp-input';
import { UserViewDetailsComponent } from './user-view-details/user-view-details.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
//import { CreditRequestsComponent } from './credit-requests/credit-requests.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
// Import your library
// import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
  AppComponent,
  HompageComponent,
  SignUpComponent,
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  EnterOtpComponent,
  SubscriptionsComponent,
  HeaderComponent,
  FooterComponent,
  DbHeaderComponent,
  DbSidebarComponent,
  UserProfileComponent,
  EditProfileComponent,
  AddUserComponent,
  MyUsersComponent,
  UserDetailsComponent,
  UserCreditsComponent,
  MySubscriptionsComponent,
  TransferCreditComponent,
  ChangePasswordComponent,
  UserViewDetailsComponent,
  AboutUsComponent,
  ContactUsComponent,
  FaqComponent,
  HowItWorksComponent,
  TermsAndConditionComponent,
  SafeHtmlPipe,
  //CreditRequestsComponent,

  ],
  imports: [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
   ToastrModule.forRoot({
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }),
  BsDropdownModule.forRoot(),
  NgxIntlTelInputModule,
  // NgxStripeModule.forRoot('pk_test_aeUUjYYcx4XNfKVW60pmHTtI'),
   // NgOtpInputModule
   NgxPaginationModule,
  ],
  providers: [WebServiceService, AuthGuardGuard ],
  bootstrap: [AppComponent],
    schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
