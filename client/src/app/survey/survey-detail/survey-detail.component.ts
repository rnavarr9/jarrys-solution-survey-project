import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('cancel') button!: ElementRef;

  constructor(private cd: ChangeDetectorRef,
    private repository: SurveyRepository,
    private router: Router,
    private activeRoute: ActivatedRoute) 
  { 
  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.params['mode'] === 'edit';
    this.cd.detectChanges();
    if (this.editing)
    {
      Object.assign(this.item, this.repository.getSurvey(this.activeRoute.snapshot.params['id']));
    }
  }

  
  save(form: NgForm): void
  {
    this.repository.updateSurvey(this.item);
    
    this.router.navigateByUrl('/survey/list');
  }
  
  deleteSurvey(id?: number): void
  {
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deleteSurvey(id);
    }
    else
    {
      this.router.navigateByUrl('/survey/list');
    }
  }

}
