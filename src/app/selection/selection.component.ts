import { Component } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent {
  public regions = ['Région A', 'Région B', 'Région C', 'Région D'];
}
