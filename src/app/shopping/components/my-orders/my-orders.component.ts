import { Component, OnInit } from '@angular/core';
import { AuthService } from '@membership/services/auth.service';
import { Order } from '@shopping/models/order';
import { OrderService } from '@shopping/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.currentUser) {
      this.orderService
        .getOrdersByUserId(this.authService.currentUser.id)
        .subscribe(
          (data: Order[]) => {
            this.orders = data;
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.authService.getCurrentUser().subscribe(
        user => {
          this.orderService
            .getOrdersByUserId(this.authService.currentUser.id)
            .subscribe(
              (orders: Order[]) => {
                this.orders = orders;
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
