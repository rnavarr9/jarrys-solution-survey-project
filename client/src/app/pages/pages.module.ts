import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PartialsModule } from '../partials/partials.module';


@NgModule({
  imports: [BrowserModule, FormsModule, PartialsModule],
  declarations: [
    AboutComponent,
    HomeComponent,
  ],
  exports: [
    AboutComponent,
    HomeComponent,
    PartialsModule]
})
export class PagesModule {}