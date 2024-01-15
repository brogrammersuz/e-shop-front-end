import { NgModule } from '@angular/core';
import { HomeComponent } from '@core/components/home/home.component';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [HomeComponent, NavbarComponent],
  exports: [HomeComponent, NavbarComponent]
})
export class CoreModule {}
