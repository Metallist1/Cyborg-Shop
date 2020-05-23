import { Component, OnInit } from '@angular/core';
import * as three from 'three';
declare var VANTA;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Function-project';
  ngOnInit() {
    VANTA.GLOBE({
      el: '#main',
      THREE: three,
      mouseControls: true,
      touchControls: true,
      scale: 1.00,
      scaleMobile: 1.00
    });
  }
}
