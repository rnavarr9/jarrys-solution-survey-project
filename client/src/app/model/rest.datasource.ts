import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { Survey } from "./survey.model";

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
    baseUrl: string;


    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getSurveys(): Observable<Survey[]> {
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': this.baseUrl
        }
        const requestOptions = {
            headers: new HttpHeaders(headerDict),
        };

        return this.http.get<Survey[]>(this.baseUrl + 'surveys',requestOptions);
    }
}