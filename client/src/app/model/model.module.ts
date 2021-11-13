import { NgModule } from '@angular/core';
import { SurveyRepository } from './survey.repository'
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [SurveyRepository, RestDataSource ]
})
export class ModelModule { }
