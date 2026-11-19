import { Component, signal } from '@angular/core';
import { Trip } from '../../../../resources/models/trip.model';
import { MOCK_TRIPS } from '../../services/trip.mock';


@Component({
  imports: [],
  selector: 'app-trips-list',
  styleUrl: './trips-list.scss',
  templateUrl: './trips-list.html',
})
export class TripsList {
  trips = signal<Trip[]>(MOCK_TRIPS);
  isLoading = signal(false);

}
