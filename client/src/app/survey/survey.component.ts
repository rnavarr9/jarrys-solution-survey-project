import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';
import { BasePageComponent } from '../partials/base-page/base-page.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})

export class SurveyComponent extends BasePageComponent {

  constructor(private repository: SurveyRepository,
    route: ActivatedRoute, private router: Router) 
  {
    super(route);
  }

  get surveys(): Survey[]
  {
    return this.repository.getSurveys();
  }

  deleteSurvey(id?: number): void
  {
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deleteSurvey(id);
    }
    else
    {
      window.location.reload(); // refresh fix
      this.router.navigateByUrl('/surveys');
    }
  }

  addSurvey(): void
  {
    this.router.navigateByUrl('/survey/list/item/add');
  }

  editSurvey(id?: number): void
  {
    this.router.navigateByUrl('/survey/list/item/edit/' + id);
  }


}
