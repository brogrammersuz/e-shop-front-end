import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@membership/models/user';
import { AuthService } from '@membership/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  surname: string;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  register() {
    const user = new User(this.name, this.surname, this.email, this.password);

    this.authService.register(user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
      },

      error => {
        console.log(error);
      }
    );
  }
}
