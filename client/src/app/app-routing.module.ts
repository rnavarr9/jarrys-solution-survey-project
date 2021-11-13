import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, data: {title:'Home'}},
  {path:'about', component: AboutComponent, data: {title:'About'}},
  {path:'surveys', component: SurveyComponent, data: {title:'Surveys'}},
  {path:'', redirectTo:'/surveys', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
