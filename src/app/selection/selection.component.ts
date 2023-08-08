import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proposition } from 'app/models/proposition';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  @Input()
  propositions!: Proposition[];

  @Output()
  whenUserHasChosen: EventEmitter<Proposition> = new EventEmitter();

  public hasUserChosen = false;

  ngOnInit(): void {
    this.configureNewRound();
  }

  /** Configure un round */
  private configureNewRound(): void {
    this.hasUserChosen = false;
  }

  /**
   * Une région a été sélectionnée
   * @param selectedRegion Région sélectionnée
   */
  public onRegionSelected(selectedRegion: Proposition): void {
    this.hasUserChosen = true;
    selectedRegion.isSelected = true;
    this.whenUserHasChosen.next(selectedRegion);
  }
}
