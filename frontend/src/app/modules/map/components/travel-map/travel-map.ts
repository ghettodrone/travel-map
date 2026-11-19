
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import 'ol/ol.css';

@Component({
  selector: 'app-travel-map',
  imports: [],
  templateUrl: './travel-map.html',
  styleUrl: './travel-map.scss',
})
export class TravelMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement')
  private mapElement!: ElementRef<HTMLDivElement>;

  private map?: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: this.mapElement.nativeElement,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],

      view: new View({
        center: fromLonLat([0, 20]),
        zoom: 2.3,
        minZoom: 2,
        maxZoom: 18,
      }),
    });
  }

  ngOnDestroy(): void {
    this.map?.setTarget(undefined);
  }
}

