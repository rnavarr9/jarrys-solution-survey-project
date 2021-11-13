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

  deleteBook(id?: number): void
  {
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deleteBook(id);
    }
    else
    {
      window.location.reload(); // refresh fix
      this.router.navigateByUrl('/surveys');
    }
  }

  addBook(): void
  {
    this.router.navigateByUrl('/survey/list/item/add');
  }

  editBook(id?: number): void
  {
    this.router.navigateByUrl('/survey/list/item/edit/' + id);
  }


}
