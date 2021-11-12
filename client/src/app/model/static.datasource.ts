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
}

