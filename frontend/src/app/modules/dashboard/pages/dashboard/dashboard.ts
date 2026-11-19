import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';

import { gsap } from 'gsap';

@Component({
  imports: [BadgeModule, ButtonModule ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})

export class Dashboard implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private animationContext?: gsap.Context;

  ngAfterViewInit(): void {
    this.animationContext = gsap.context(() => {

      // Самолётик — летает по диагонали
      gsap.to('.travel-object--plane', {
        x: 90,
        y: -35,
        rotation: -12,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Компас — медленно вращается
      gsap.to('.travel-object--compass', {
        rotation: 360,
        duration: 18,
        ease: 'none',
        repeat: -1,
      });

      // Метка — парит вверх-вниз
      gsap.to('.travel-object--location', {
        y: -18,
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Чемодан — слегка покачивается
      gsap.to('.travel-object--suitcase', {
        rotation: 12,
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

    }, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
