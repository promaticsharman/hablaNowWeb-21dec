import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { AuthGuardGuard } from './shared/auth-guard.guard';
import { UserViewDetailsComponent } from './user-view-details/user-view-details.component';
import { FaqComponent } from './faq/faq.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
//import { CreditRequestsComponent } from './credit-requests/credit-requests.component';
const routes: Routes = [
  {
    path: '',
    component: HompageComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'enterOTP',
    component: EnterOtpComponent,
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
  },
  {
    path: 'myProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'addUser',
    component: AddUserComponent,
    canActivate: [AuthGuardGuard],
  },
  // {
  //   path: 'credit_requests',
  //   component: CreditRequestsComponent,
  //   canActivate: [AuthGuardGuard],
  // },
  {
    path: 'myUsers',
    component: MyUsersComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'userDetails',
    component: UserDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'userCredits',
    component: UserCreditsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'mySubscription',
    component: MySubscriptionsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'transferCredits',
    component: TransferCreditComponent,
  },
  {
    path: 'transferCredits/:id',
    component: TransferCreditComponent,
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'organization-user-detail',
    component: UserViewDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'organization-user-detail/:id',
    component: UserViewDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'how-it-work',
    component: HowItWorksComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'term-and-condition',
    component: TermsAndConditionComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
