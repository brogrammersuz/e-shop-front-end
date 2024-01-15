import { NgModule } from '@angular/core';
import { LoginComponent } from '@membership/components/login/login.component';
import { RegisterComponent } from '@membership/components/register/register.component';
import { EmailValidatorDirective } from '@membership/directives/email-validator.directive';
import { AuthService } from '@membership/services/auth.service';
import { UserService } from '@membership/services/user.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent, RegisterComponent, EmailValidatorDirective],
  providers: [AuthService, UserService]
})
export class MembershipModule {}
