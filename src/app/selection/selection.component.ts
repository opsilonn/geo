import { Component, OnInit } from '@angular/core';
import { Proposition } from 'app/models/proposition';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  public hasUserChosen = false;
  public regions: Proposition[] = [
    { label: 'Région A', isCorrect: false, isIncorrect: false, isSelected: false },
    { label: 'Région B', isCorrect: false, isIncorrect: false, isSelected: false },
    { label: 'Région C', isCorrect: false, isIncorrect: false, isSelected: false },
    { label: 'Région D', isCorrect: false, isIncorrect: false, isSelected: false }
  ];
  private answer = '';

  ngOnInit(): void {
    this.configureNewRound();
  }

  /** Configure un round */
  private configureNewRound(): void {
    this.hasUserChosen = false;
    this.regions.forEach((region: Proposition) => region.isCorrect = region.isIncorrect = region.isSelected = false);
    const randomIndex: number = Math.floor(Math.random() * this.regions.length);
    this.answer = this.regions[randomIndex].label;
  }

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
    const TIME_TO_WAIT_TO_SHOW_RESULT = 1.5 * 1000;

    setTimeout(() => {
      const correctAnwser = this.regions.find((region: Proposition) => region.label === this.answer);
      correctAnwser!.isCorrect = true;

      const selectedAnswer = this.regions.find((region: Proposition) => region.isSelected);
      if (!selectedAnswer!.isCorrect) {
        selectedAnswer!.isIncorrect = true;
      }

      setTimeout(() => this.configureNewRound(), TIME_TO_WAIT_TO_RESET_ROUND);
    }, TIME_TO_WAIT_TO_SHOW_RESULT);
  }
}
