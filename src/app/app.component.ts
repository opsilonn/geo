import { Component, ViewChild } from '@angular/core';
import { CarteComponent } from 'app/carte/carte.component';
import { ListHelper } from 'app/helpers/ListHelper';
import { GameModeEnum } from 'app/models/game-mode-enum';
import { Proposition } from 'app/models/proposition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(CarteComponent)
  carteComponent!: CarteComponent;

  public gameMode = GameModeEnum.FIND_NAME;
  public isUserInputEnabled = true;
  public propositions: Proposition[] = [];
  public stateName = '';
  private stateNames: string[] = [];
  private stateNamesCopy: string[] = [];
  private readonly NUMBER_OF_INCORRECT_ANSWERS = 3;

  /** Lance une partie une partie */
  public launchParty(): void {
    this.stateNames = this.carteComponent.getAllStates();
    this.stateNamesCopy = this.stateNames;
    this.initRound();
  }

  /** Initialise la manche d'une partie */
  private initRound(): void {
    this.setRandomStateName();

    if (this.isGameModeFindName()) {
      this.initFindNameRound();
    }

    this.isUserInputEnabled = true;
  }

  /** Sélectionne aléatoirement une région, et la supprime de la liste */
  private setRandomStateName(): void {
    const randomIndex: number = Math.floor(Math.random() * this.stateNames.length);
    this.stateName = this.stateNames.splice(randomIndex, 1)[0];
  }
  
  /** Initialise la manche d'une partie */
  private initFindNameRound(): void {
    this.carteComponent.setSelectedState(this.stateName);
    this.carteComponent.disableInteraction();

    const correctAnswer: Proposition = { label: this.stateName, isCorrect: false, isIncorrect: false, isSelected: false };
    const incorrectAnswer: Proposition[] = (ListHelper
      .getRandomElements(this.stateNamesCopy, this.NUMBER_OF_INCORRECT_ANSWERS) as string[])
      .map((stateName: string) => ({ label: stateName, isCorrect: false, isIncorrect: false, isSelected: false }));
    const answers = [correctAnswer, ...incorrectAnswer];

    this.propositions = ListHelper.shuffle(answers) as Proposition[];
  }

  /** Lorsque le joueur a sélectionné une proposition, on attend un peu avant de révéler les réponses, puis on relance un round */
  public playerHasChosenProposition(chosenProposition: Proposition): void {
    this.isUserInputEnabled = false;
    const TIME_TO_WAIT_FOR_NEXT_ROUND = 1.5 * 1000;
    const TIME_TO_WAIT_TO_SHOW_RESULT = 1.5 * 1000;

    setTimeout(() => {
      const correctAnwser = this.propositions.find((proposition: Proposition) => proposition.label === this.stateName);
      correctAnwser!.isCorrect = true;

      const userAnswer = this.propositions.find((proposition: Proposition) => proposition.label === chosenProposition.label);
      userAnswer!.isSelected = true;
      if (!userAnswer!.isCorrect) {
        userAnswer!.isIncorrect = true;
      }
      setTimeout(() => this.initRound(), TIME_TO_WAIT_FOR_NEXT_ROUND);
    }, TIME_TO_WAIT_TO_SHOW_RESULT);
  }

  /** Retourne si le mode de jeu sélectionné est "trouver par nom" */
  public isGameModeFindName(): boolean {
    return this.gameMode === GameModeEnum.FIND_NAME;
  }

  /** Retourne si le mode de jeu sélectionné est "trouver sur la carte" */
  public isGameModeFindOnMap(): boolean {
    return this.gameMode === GameModeEnum.FIND_ON_MAP;
  }
}
