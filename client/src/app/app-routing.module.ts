import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyDetailComponent } from './survey/survey-detail/survey-detail.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, data: {title:'Home'}},
  //{path:'home', component: SurveyComponent, data: {title:'Surveys'}},
  {path:'about', component: AboutComponent, data: {title:'About'}},
  {path:'survey', loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule)},
  {path:'', redirectTo:'/survey/list', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
