import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CaracteristicaFormUtils } from './form-utils';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent extends CaracteristicaFormUtils implements OnInit {



  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

}
