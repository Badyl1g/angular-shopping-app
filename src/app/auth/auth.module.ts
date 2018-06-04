import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";

//  This is a way of declaring routes in the same file:

// import { Routes, RouterModule } from "@angular/router";

// const authRoutes: Routes = [
//   { path: 'signup', component: SignupComponent },
//   { path: 'signin', component: SigninComponent }
// ]

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
    // RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule {}