import { Component, signal } from '@angular/core';
import { Trip } from '../../../../resources/models/trip.model';
import { MOCK_TRIPS } from '../../services/trip.mock';
import { DatePipe } from '@angular/common';
import { TravelMap } from '../../../map/components/travel-map/travel-map';


@Component({
  imports: [DatePipe, TravelMap],
  selector: 'app-trips-list',
  styleUrl: './trips-list.scss',
  templateUrl: './trips-list.html',
})
export class TripsList {
  trips = signal<Trip[]>(MOCK_TRIPS);
  isLoading = signal(false);

}
