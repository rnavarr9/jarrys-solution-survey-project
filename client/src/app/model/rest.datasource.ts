import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { Survey } from "./survey.model";

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
    baseUrl: string;

    private httpOptions =
    {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getSurveys(): Observable<Survey[]> {
        return this.http.get<Survey[]>(this.baseUrl + 'surveys');
    }


    addSurvey(survey: Survey): Observable<Survey> {

        return this.http.post<Survey>(this.baseUrl + 'surveys/add', survey);
    }

    updateSurvey(survey: Survey): Observable<Survey> {
        return this.http.post<Survey>(`${this.baseUrl}surveys/edit/${survey._id}`, survey, this.httpOptions);
    }

    deleteSurvey(id: number): Observable<Survey> {
        return this.http.get<Survey>(`${this.baseUrl}surveys/delete/${id}`);
    }
}