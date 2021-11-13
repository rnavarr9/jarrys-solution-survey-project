import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {
  editing = false;
  item: Survey = new Survey(0,"","");

  constructor(private repository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute) 
  { 
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing)
    {
      Object.assign(this.item, repository.getSurvey(activeRoute.snapshot.params['id']));
    }
  }

  ngOnInit(): void {
  }

  
  save(form: NgForm): void
  {
    this.repository.updateSurvey(this.item);
    this.router.navigateByUrl('/survey/list');
  }

}
