
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
import { boundingExtent } from 'ol/extent';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';

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

  private fitMapToMarkers(): void {
    const source = this.createMarkers().getSource();

    if (!source || !this.map) {
      return;
    }

    const extent = source.getExtent();

    this.map.getView().fit(extent!, {
      padding: [80, 80, 80, 80],
      maxZoom: 8,
      duration: 1000,
    });
  }

  private createMarkers(): VectorLayer<VectorSource> {
    const places = [
      {
        name: 'Tokyo',
        coordinates: [139.6917, 35.6895],
        color: '#a5d6a7',
      },
      {
        name: 'Bangkok',
        coordinates: [100.5018, 13.7563],
        color: '#e2c99e',
      },
      {
        name: 'Ho Chi Minh City',
        coordinates: [106.6297, 10.8231],
        color: '#9db9b0',
      },
    ];

    const features = places.map((place) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(place.coordinates)),
        name: place.name,
      });

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 9,
            fill: new Fill({
              color: place.color,
            }),
            stroke: new Stroke({
              color: '#ffffff',
              width: 2,
            }),
          }),

          text: new Text({
            text: place.name,
            offsetY: -22,
            font: '12px Inter',
            fill: new Fill({
              color: '#ffffff',
            }),
            stroke: new Stroke({
              color: '#17251e',
              width: 3,
            }),
          }),
        }),
      );

      return feature;
    });

    return new VectorLayer({
      source: new VectorSource({
        features,
      }),
    });
  }

  ngAfterViewInit(): void {
    const markersLayer = this.createMarkers();

    this.map = new Map({
      target: this.mapElement.nativeElement,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markersLayer,
      ],

      view: new View({
        center: fromLonLat([0, 20]),
        zoom: 2,
      }),
    });

    const source = markersLayer.getSource();

    if (source) {
      this.map.getView().fit(source.getExtent()!, {
        padding: [80, 80, 80, 80],
        maxZoom: 8,
        duration: 1000,
      });
    }
  }

  ngOnDestroy(): void {
    this.map?.setTarget(undefined);
  }
}

