import { Injectable } from "@angular/core";
import { Survey} from "./survey.model";
import { from, Observable } from "rxjs";
import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];
  private loaded= false;

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  getSurveys(): Survey[]
  {
    if(!this.loaded){
      console.log({loaded:this.loaded,surveys:this.surveys})
      this.loadSurveys();
    };
    return this.surveys;
  }

  getSurvey(id: number): Survey
  {
    return this.surveys.find(item => item._id=== id)!;
  }

  updateSurvey(newSurvey: Survey): void
  {
    if (newSurvey._id === null || newSurvey._id === 0 || newSurvey._id === undefined)
    {
      this.dataSource.addSurvey(newSurvey).subscribe(item => {
        this.surveys.push(newSurvey);
      });
    }
    else
    {
      this.dataSource.updateSurvey(newSurvey).subscribe(item => {
        this.surveys.splice(this.surveys.findIndex(b => b._id === newSurvey._id), 1, newSurvey);
      });
    }
  }

  deleteSurvey(surveyID: number): void
  {
    this.dataSource.deleteSurvey(surveyID).subscribe(item => {
      this.surveys.splice(this.surveys.findIndex(b => b._id === surveyID), 1);
    });
  }

  loadSurveys():void
  {
    this.loaded=true;
    this.dataSource.getSurveys()
      .subscribe(surveys => this.surveys=surveys);

  }
}