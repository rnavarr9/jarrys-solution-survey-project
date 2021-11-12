import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';
import { BasePageComponent } from '../partials/base-page/base-page.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent extends BasePageComponent {

  constructor(private repository: SurveyRepository,route: ActivatedRoute) {
    super(route);
  }

  get surveys(): Survey[]
  {
    return this.repository.getSurveys();
  }


}
