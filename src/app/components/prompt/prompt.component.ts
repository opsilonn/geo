import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {

  @Input() stateName = '';

  public isUserCorrect = false;
  public wrongStateName = '';

  /**
   * Transmet la valeur renseignée par l'utilisateur
   * @param userInput la valeur renseignée par l'utilisateur
   */
  public setUserAnswer(userInput: string): void {
    if (this.stateName === userInput) {
      this.isUserCorrect = true;
    } else {
      this.wrongStateName = userInput;
    }
  }

  /** Réinitialise les valeurs du composant */
  public reset(): void {
    this.isUserCorrect = false;
    this.wrongStateName = '';
  }
}
