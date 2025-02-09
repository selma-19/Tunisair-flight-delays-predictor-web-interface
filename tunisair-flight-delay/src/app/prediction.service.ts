import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://127.0.0.1:5000/predict';

  constructor(private http: HttpClient) {}

  predict(flightId: string, flightDate: string): Observable<any> {
    const formattedDate = new Date(flightDate).toISOString().split('T')[0];
    const body = {
      flightId,
      flightDate: formattedDate
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
