import { Injectable } from "@angular/core";
import { Survey} from "./survey.model";
import { from, Observable } from "rxjs";

@Injectable()
export class StaticDataSource
{
    private surveys: Survey[] =
    [
        new Survey(1,'Test2','Test3'),        
        new Survey(2,'Test3','Test4'),
        new Survey(3,'Test4','Test2')
    ];

    getSurveys(): Observable<Survey[]>
    {
        return from([this.surveys]);
    }

    
    addSurvey(survey: Survey): Observable<Survey> {
        return from([this.surveys[0]]);        
    }

    updateSurvey(survey: Survey): Observable<Survey> {
        return from([this.surveys[0]]);        
    }

    deleteSurvey(id: number): Observable<Survey> {
        return from([this.surveys[0]]);        
    }
}

