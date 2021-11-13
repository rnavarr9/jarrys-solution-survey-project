import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModelModule } from '../model/model.module';
import { SurveyComponent } from './survey.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyRepository } from '../model/survey.repository';
import { StaticDataSource } from '../model/static.datasource';
import { SurveyHolderComponent } from './survey-holder/survey-holder.component';

const routing = RouterModule.forChild([
  { path: 'list', component: SurveyComponent, data: {title: 'Surveys'},
   children: [
      { path: 'item/:mode/:id', component: SurveyDetailComponent, data: {title: 'Edit Book'}},
      { path: 'item/:mode', component: SurveyDetailComponent, data: {title: 'Add Book'}},
      { path: '**', redirectTo: 'list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [ModelModule, CommonModule, FormsModule,routing],
  declarations: [SurveyComponent, SurveyDetailComponent, SurveyHolderComponent],
  exports: [SurveyComponent]
})
export class SurveyModule {}