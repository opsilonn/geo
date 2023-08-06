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
    { label: 'Région A', isCorrect: false, isIncorrect: false, isSelected: false },
    { label: 'Région B', isCorrect: false, isIncorrect: false, isSelected: false },
    { label: 'Région C', isCorrect: false, isIncorrect: false, isSelected: false },
    { label: 'Région D', isCorrect: false, isIncorrect: false, isSelected: false }
  ];
  private answer = 'Région A';


  /**
   * Une région a été sélectionnée
   * @param selectedRegion Région sélectionnée
   */
  public onRegionSelected(selectedRegion: Proposition): void {
    this.hasUserChosen = true;
    this.regions.forEach((region: Proposition) => region.isSelected = false);
    selectedRegion.isSelected = true;
    this.showResult();
  }

  /** Attends un délai, puis révèle les résultats */
  private showResult(): void {
    const TIME_TO_WAIT_TO_RESET_ROUND = 1.5 * 1000;
    setTimeout(() => {
      const correctAnwser = this.regions.find((region: Proposition) => region.label === this.answer);
      correctAnwser!.isCorrect = true;

      const selectedAnswer = this.regions.find((region: Proposition) => region.isSelected);
      if (!selectedAnswer!.isCorrect) {
        selectedAnswer!.isIncorrect = true;
      }
    }, TIME_TO_WAIT_TO_RESET_ROUND);
  }
}
