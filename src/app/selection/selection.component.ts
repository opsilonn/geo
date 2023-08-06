import { Component } from '@angular/core';
import { Proposition } from 'src/app/models/proposition';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent {
  public hasUserChosen = false;
  public regions: Proposition[] = [
    { label: 'Région A', isSelected: false },
    { label: 'Région B', isSelected: false },
    { label: 'Région C', isSelected: false },
    { label: 'Région D', isSelected: false }
  ];


  /**
   * Une région a été sélectionnée
   * @param selectedRegion Région sélectionnée
   */
  public onRegionSelected(selectedRegion: Proposition): void {
    this.hasUserChosen = true;
    this.regions.forEach((region: Proposition) => region.isSelected = false);
    selectedRegion.isSelected = true;
  }
}
