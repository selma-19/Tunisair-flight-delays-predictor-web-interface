import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {PredictionService} from '../prediction.service';
import {catchError, map, of} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  flightNumber: string = '';
  predictionService = inject(PredictionService);
  protected errorMessage: string='';
  protected prediction: any;
  searchFlight() {
    if (this.flightNumber) {
      console.log(this.flightNumber);
      this.predictionService
        .predict(this.flightNumber)
        .pipe(
          map((response) => response.prediction),
          catchError((error) => {
            console.error('Error:', error);
            this.errorMessage = 'Failed to fetch prediction!';
            return of(null);
          })
        )
        .subscribe((result) => {
          this.prediction = result;
        });
    } else {
      alert('Please enter a flight number');
    }
  }
}
