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
  flightDate: string = '';  // New date property
  predictionService = inject(PredictionService);
  protected errorMessage: string = '';
  protected prediction: any;

  searchFlight() {
    // Clear previous results
    this.prediction = null;
    this.errorMessage = '';

    // Validate inputs
    if (!this.flightNumber || !this.flightDate) {
      this.errorMessage = 'Veuillez saisir le numéro de vol et la date';
      return;
    }

    // Call service with both parameters
    this.predictionService
      .predict(this.flightNumber, this.flightDate)  // Updated service call
      .pipe(
        map((response) => response.prediction),
        catchError((error) => {
          console.error('Error:', error);
          this.errorMessage = 'Erreur lors de la prédiction. Veuillez réessayer.';
          return of(null);
        })
      )
      .subscribe((result) => {
        this.prediction = result;
      });
  }
}
